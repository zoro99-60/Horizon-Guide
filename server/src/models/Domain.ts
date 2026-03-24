import mongoose, { Schema, Document } from 'mongoose';

export interface IDomain extends Document {
    id: string;
    title: string;
    shortDescription: string;
    icon: string;
    bgClass: string;
    colorClass: string;
    overview: string;
    skills: string[];
    roles: string[];
    salaryRange: string;
    futureScope: string;
}

const DomainSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    icon: { type: String, required: true },
    bgClass: { type: String, required: true },
    colorClass: { type: String, required: true },
    overview: { type: String, required: true },
    skills: { type: [String], required: true },
    roles: { type: [String], required: true },
    salaryRange: { type: String, required: true },
    futureScope: { type: String, required: true },
});

export default mongoose.model<IDomain>('Domain', DomainSchema);
