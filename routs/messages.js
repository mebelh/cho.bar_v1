const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("../views/messages.hbs", {
        title: "Сообщения",
        isAuthentificated: req.session.isAuthentificated,
        isMessages: true,
    });
});

module.exports = router;
