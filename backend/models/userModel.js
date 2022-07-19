import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, enter name"]
    },
    email: {
        type: String,
        require: [true, "Please, enter email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)