const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("../views/search.hbs", {
        title: "Смотреть анкеты",
        ...req.session.user,
        isSearch: true,
    });
});

module.exports = router;
