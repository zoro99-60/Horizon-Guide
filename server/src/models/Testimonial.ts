import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
    name: string;
    branch: string;
    quote: string;
    avatar: string;
}

const TestimonialSchema: Schema = new Schema({
    name: { type: String, required: true },
    branch: { type: String, required: true },
    quote: { type: String, required: true },
    avatar: { type: String, required: true },
});

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
