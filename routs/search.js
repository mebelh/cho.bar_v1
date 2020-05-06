const { Router } = require("express");
const router = Router();

const User = require("../models/User");

const constractCandidate = async (session) => {
    let e = session.candidate;
    if (!e) {
        e = (await User.aggregate([{ $sample: { size: 1 } }]))[0];
        session.save();
    }

    return {
        name: e.name,
        age: e.age,
        description: e.description,
        id: e._id,
        img: e.img,
    };
};

router.get("/", async (req, res) => {
    const candidate = await constractCandidate(req.session);

    // console.log(candidate);

    res.render("../views/search.hbs", {
        title: "Смотреть анкеты",
        candidate,
        isSearch: true,
        isAuthentificated: req.session.isAuthentificated,
    });
});

router.post("/next", async (req, res) => {
    req.session.candidate = (
        await User.aggregate([{ $sample: { size: 1 } }])
    )[0];
    const candidate = await constractCandidate(req.session);

    res.send(candidate);
});

router.post("/like/:id", async (req, res) => {
    const likeCandidate = await User.findOne({ _id: req.params.id });

    const user = await User.findOne({ _id: req.session.user._id });

    likeCandidate.likes.peoples.push(user);
    await likeCandidate.save();
});

module.exports = router;
