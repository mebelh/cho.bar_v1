const express = require("express");
const path = require("path");

const app = express();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const mongoose = require("mongoose");

const User = require("./models/User");

const MONGO_URI =
    "mongodb+srv://memet:12345@cluster0-mjl6h.mongodb.net/chobar?retryWrites=true&w=majority";

const firstVisitRout = require("./routs/firstVisit");
const regirserRout = require("./routs/auth");

const PORT = 3000;

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "view", "img")));

app.use(express.urlencoded({ extended: true }));

app.use("/", firstVisitRout);
app.use("/auth", regirserRout);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });

        const candidate = await User.findOne();

        if (!candidate) {
            const user = new User({
                login: "memet",
                password: "123",
                name: "Memet",
                gender: 0,
            });
            await user.save();
        }

        app.listen(PORT, () => {
            console.log("Server has been started on " + PORT);
        });
    } catch (e) {
        console.log(e);
    }
};
start();
