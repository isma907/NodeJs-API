import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../interfaces";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    imageUrl: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as any);
    }
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

// 🚫 Nunca devolver password
userSchema.set("toJSON", {
    transform: (_, ret) => {
        delete ret.password;
        return ret;
    },
});

export const UserSchema = mongoose.model<User>("users", userSchema);