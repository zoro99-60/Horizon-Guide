import { Request, Response } from 'express';
import Domain from '../models/Domain';

export const getDomains = async (req: Request, res: Response) => {
    try {
        const domains = await Domain.find();
        res.json(domains);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching domains', error });
    }
};

export const getDomainById = async (req: Request, res: Response) => {
    try {
        const domain = await Domain.findOne({ id: req.params.id });
        if (!domain) return res.status(404).json({ message: 'Domain not found' });
        res.json(domain);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching domain', error });
    }
};
