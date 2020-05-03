const express = require("express");
const path = require("path");

const app = express();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");

const firstVisitRout = require("./routs/firstVisit");

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

app.listen(PORT, () => {
    console.log("Server has been started on " + PORT);
});
