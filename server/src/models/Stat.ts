import mongoose, { Schema, Document } from 'mongoose';

export interface IStat extends Document {
    value: string;
    label: string;
}

const StatSchema: Schema = new Schema({
    value: { type: String, required: true },
    label: { type: String, required: true },
});

export default mongoose.model<IStat>('Stat', StatSchema);
