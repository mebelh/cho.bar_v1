const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("../views/myPage.hbs", {
        title: "Моя страница",
        ...req.session.user,
        isAuthentificated: req.session.isAuthentificated,
        isMy: true,
    });
});

module.exports = router;
