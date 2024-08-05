import mongoose from "mongoose";

export const profileSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        age: {type: Number, required: true},
        gender: {type: String, required: true},
        description: {type: String, required: true}
    }
)

export const Profile = mongoose.model('Profile', profileSchema);