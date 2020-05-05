const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    if (req.session.isAuthentificated) {
        res.render("../views/myPage.hbs", {
            title: "Моя анкета",
            ...req.session.user,
            isAuthentificated: req.session.isAuthentificated,
            isMy: true,
        });
    } else {
        res.render("../views/firstvisit.hbs", {
            title: "Добро пожаловать",
        });
    }
});

module.exports = router;
