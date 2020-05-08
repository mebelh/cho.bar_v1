const express = require("express");
const path = require("path");

const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const User = require("./models/User");

const MONGO_URI =
    "mongodb+srv://memet:12345@cluster0-mjl6h.mongodb.net/chobar?retryWrites=true&w=majority";

const firstVisitRout = require("./routs/firstVisit");
const regirserRout = require("./routs/auth");
const myPageRout = require("./routs/myPage");
const searchRout = require("./routs/search");
const editInfRout = require("./routs/editInf");
const messagesRout = require("./routs/messages");

const PORT = 3000;

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const store = new MongoStore({
    collection: "sessions",
    uri: MONGO_URI,
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "view", "img")));

app.use(
    session({
        secret: "seccccret",
        resave: false,
        saveUninitialized: false,
        store,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());

app.use("/", firstVisitRout);
app.use("/auth", regirserRout);
app.use("/mypage", myPageRout);
app.use("/search", searchRout);
app.use("/editinf", editInfRout);
app.use("/messages", messagesRout);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });

        // for (let index = 2; index < 24; index++) {
        //     const element = new User({
        //         login: "clon" + index,
        //         password: "clone" + index,
        //         description: "i am bot num " + index + ". Hello)))",
        //         gender: "male",
        //         name: "bot" + index,
        //         age: index + 3,
        //     });
        //     await element.save();
        // }

        app.listen(PORT, () => {
            console.log("Server has been started on " + PORT);
        });
    } catch (e) {
        console.log(e);
    }
};
start();
