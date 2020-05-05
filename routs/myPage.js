const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("../views/myPage.hbs", {
        title: "Моя страница",
    });
});

module.exports = router;
