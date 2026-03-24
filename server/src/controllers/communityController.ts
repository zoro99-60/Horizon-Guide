import { Request, Response } from 'express';
import Discussion from '../models/Discussion';

export const getDiscussions = async (req: Request, res: Response) => {
    try {
        const { domain } = req.query;
        const filter = domain && domain !== 'all' ? { domain } : {};
        const discussions = await Discussion.find(filter).sort({ timestamp: -1 });
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching discussions', error });
    }
};

export const getFeaturedDiscussions = async (req: Request, res: Response) => {
    try {
        const discussions = await Discussion.find({ featured: true });
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching featured discussions', error });
    }
};
