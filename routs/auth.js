const { Router } = require("express");

const router = Router();

router.get("/register", (req, res) => {
    res.render("../views/register.hbs");
});

router.post("/register", (req, res) => {
    res.redirect("/");
});

module.exports = router;
