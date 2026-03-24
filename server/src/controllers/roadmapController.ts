import { Request, Response } from "express";
import RoadmapTemplate from "../models/RoadmapTemplate";
import Company from "../models/Company";

export const getRoadmapByDomain = async (req: Request, res: Response) => {
    try {
        const { domainId } = req.params;
        const roadmap = await RoadmapTemplate.findOne({ domainId });
        if (!roadmap) {
            return res.status(404).json({ message: "Roadmap not found" });
        }
        res.json(roadmap);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCompaniesByDomain = async (req: Request, res: Response) => {
    try {
        const { domainId } = req.params;
        const companies = await Company.find({ domainId });
        res.json(companies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
