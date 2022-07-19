import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Please, enter title"],
    },
    text: {
        type: String,
        required: [true, "Please, enter text"],
    }
}, {
    timestamps: true
})

export default mongoose.model('Goals', goalSchema)