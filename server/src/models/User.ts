import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isTwoFactorEnabled: boolean;
    twoFactorSecret?: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre<IUser>("save", async function () {
    if (!this.isModified("password")) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error: any) {
        throw error;
    }
});

// Compare password method
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
