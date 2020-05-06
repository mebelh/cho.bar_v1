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
    },
    age: {
        type: Number,
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
    email: String,
    gender: {
        type: String,
        required: true,
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
