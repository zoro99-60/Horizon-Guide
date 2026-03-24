import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizQuestion extends Document {
    question: string;
    options: {
        label: string;
        weights: Record<string, number>;
    }[];
}

const QuizQuestionSchema: Schema = new Schema({
    question: { type: String, required: true },
    options: [{
        label: { type: String, required: true },
        weights: { type: Map, of: Number, required: true }
    }]
});

export default mongoose.model<IQuizQuestion>('QuizQuestion', QuizQuestionSchema);
