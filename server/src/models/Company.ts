import mongoose, { Schema, Document } from "mongoose";

export interface ICompanyRole {
    title: string;
    salaryRange: string;
    level: string;
    applyUrl: string;
}

export interface ICompany extends Document {
    name: string;
    logo: string;
    industry: string;
    domainId: string;
    roles: ICompanyRole[];
}

const CompanyRoleSchema = new Schema({
    title: { type: String, required: true },
    salaryRange: { type: String, required: true },
    level: { type: String, required: true },
    applyUrl: { type: String, required: true }
});

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    industry: { type: String, required: true },
    domainId: { type: String, required: true },
    roles: [CompanyRoleSchema]
});

export default mongoose.model<ICompany>("Company", CompanySchema);
