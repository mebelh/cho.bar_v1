const { Router } = require("express");

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = Router();

router.get("/", (req, res) => {
    res.render("../views/editInf.hbs", {
        isAuthentificated: req.session.isAuthentificated,
        ...req.session.user,
    });
});

router.post("/", async (req, res) => {
    const password = req.body.password
        ? await bcrypt.hash(req.body.password, 12)
        : req.session.user.password;

    delete req.body.password;

    await User.findByIdAndUpdate(req.session.user._id, {
        ...req.body,
        password,
    });

    req.session.user = await User.findByIdAndUpdate(req.session.user._id);

    req.session.save();

    res.redirect("/");
});

module.exports = router;
