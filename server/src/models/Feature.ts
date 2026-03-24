import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature extends Document {
    title: string;
    description: string;
    icon: string;
}

const FeatureSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
});

export default mongoose.model<IFeature>('Feature', FeatureSchema);
