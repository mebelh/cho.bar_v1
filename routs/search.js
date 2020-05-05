const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("../views/search.hbs", {
        title: "Смотреть анкеты",
    });
});

module.exports = router;
