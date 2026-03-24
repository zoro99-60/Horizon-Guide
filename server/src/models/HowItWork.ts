import mongoose, { Schema, Document } from 'mongoose';

export interface IHowItWork extends Document {
    step: number;
    title: string;
    description: string;
    icon: string;
}

const HowItWorkSchema: Schema = new Schema({
    step: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
});

export default mongoose.model<IHowItWork>('HowItWork', HowItWorkSchema);
