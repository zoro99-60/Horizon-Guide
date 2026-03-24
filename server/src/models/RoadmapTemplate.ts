import mongoose, { Schema, Document } from "mongoose";

export interface IRoadmapPhase {
    title: string;
    weeks: string;
    description: string;
    skills: string[];
    tools: string[];
    resources: string[];
    projects: string[];
}

export interface IRoadmapTemplate extends Document {
    domainId: string;
    phases: IRoadmapPhase[];
}

const RoadmapPhaseSchema = new Schema({
    title: { type: String, required: true },
    weeks: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String }],
    tools: [{ type: String }],
    resources: [{ type: String }],
    projects: [{ type: String }]
});

const RoadmapTemplateSchema: Schema = new Schema({
    domainId: { type: String, required: true, unique: true },
    phases: [RoadmapPhaseSchema]
});

export default mongoose.model<IRoadmapTemplate>("RoadmapTemplate", RoadmapTemplateSchema);
