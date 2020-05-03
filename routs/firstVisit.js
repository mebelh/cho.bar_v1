const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("../views/firstvisit.hbs", {
        title: "Добро пожаловать",
    });
});

module.exports = router;
