const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "Имя",
    },
    birthYear: {
        type: Number,
        required: true,
        default: 2000,
    },
    description: {
        type: String,
        default: "",
    },
    img: {
        type: String,
        default:
            "https://catherinecgilmore.com/wp-content/uploads/2015/10/Twitter-emogie-wink-300x300.png",
    },
    gender: {
        type: Number,
        required: true,
        //0 - male, 1 - female
    },
    likes: {
        peoples: [
            {
                id: Schema.Types.ObjectId,
            },
        ],
    },
    messages: {
        items: [
            {
                idFr: Number,
                myMessages: [],
            },
        ],
    },
});

module.exports = model("Users", userSchema);
