const { Router } = require("express");
const User = require("../models/User");

const bcrypt = require("bcryptjs");

const router = Router();

router.get("/register", (req, res) => {
    res.render("../views/register.hbs", {
        isAuthentificated: req.session.isAuthentificated,
    });
});

router.post("/register", async (req, res) => {
    try {
        const { login, password, description, gender } = req.body;
        const candidate = await User.findOne({ login });
        if (candidate) {
            req.flash(
                "registerError",
                "Аккаунт с таким логином уже существует!"
            );
            console.log(candidate);

            res.redirect("/auth/register");
        } else {
            const hashPassword = await bcrypt.hash(password, 12);
            const user = new User({
                login,
                password: hashPassword,
                description,
                gender,
                likes: { peoples: [] },
                messages: { items: [] },
            });
            req.flash(
                "registerOk",
                "Регистрация прошла успешно, войдите в учетную запись."
            );
            await user.save();

            res.redirect("/");
        }
    } catch (e) {
        console.log(e);
    }
});

router.post("/login", async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({
        login,
    });
    if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password);
        if (areSame) {
            req.session.user = candidate;
            req.session.isAuthentificated = true;
            req.session.save((err) => {
                if (err) {
                    throw err;
                } else {
                    if (!candidate.age || !candidate.name) {
                        res.redirect("/editinf");
                    } else {
                        res.redirect("/mypage");
                    }
                }
            });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
        console.log("User not found");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;
