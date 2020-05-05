const { Router } = require("express");
const router = Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
    const candidateT = await User.aggregate([{ $sample: { size: 1 } }]);

    const candidate = {
        name: candidateT[0].name,
        age: candidateT[0].age,
        description: candidateT[0].description,
        id: candidateT[0]._id,
        img: candidateT[0].img,
    };

    res.render("../views/search.hbs", {
        title: "Смотреть анкеты",
        candidate,
        isSearch: true,
        isAuthentificated: req.session.isAuthentificated,
    });
});

router.post("/next", async (req, res) => {
    const candidateT = (await User.aggregate([{ $sample: { size: 1 } }]))[0];
    // candidateT = candidateT[0];
    const candidate = {
        age: candidateT.age,
        name: candidateT.name,
        description: candidateT.description,
        id: candidateT._id,
    };

    res.json(candidate);
});

router.post("/like/:id", async (req, res) => {
    const likeCandidate = await User.findOne({ _id: req.params.id });

    const user = await User.findOne({ _id: req.session.user._id });

    likeCandidate.likes.peoples.push(user);
    await likeCandidate.save();

    // console.log(req.params.id);
    // res.json();
    // likeCandidate.likes.peoples.push(req.body.id);
});

module.exports = router;
