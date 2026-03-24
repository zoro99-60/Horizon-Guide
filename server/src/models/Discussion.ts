import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscussion extends Document {
    id: string;
    title: string;
    author: string;
    avatar: string;
    preview: string;
    domain: string;
    timestamp: string;
    replies: number;
    featured: boolean;
}

const DiscussionSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    avatar: { type: String, required: true },
    preview: { type: String, required: true },
    domain: { type: String, required: true },
    timestamp: { type: String, required: true },
    replies: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
});

export default mongoose.model<IDiscussion>('Discussion', DiscussionSchema);
