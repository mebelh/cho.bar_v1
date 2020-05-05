const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.get("/register", (req, res) => {
    res.render("../views/register.hbs");
});

router.post("/register", async (req, res) => {
    res.redirect("/");
});

router.post("/login", async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({
        login,
    });
    if (candidate) {
        if (candidate.password === password) {
            console.log("Good");
            res.redirect("/");
        } else {
            console.log("Pass err" + password + "|" + candidate.password);
        }
    } else {
        console.log("User not found");
    }
});

module.exports = router;
