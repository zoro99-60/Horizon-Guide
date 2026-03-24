import { Request, Response } from 'express';
import Stat from '../models/Stat';
import Testimonial from '../models/Testimonial';
import Feature from '../models/Feature';
import HowItWork from '../models/HowItWork';

export const getStats = async (req: Request, res: Response) => {
    try {
        const stats = await Stat.find();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
};

export const getTestimonials = async (req: Request, res: Response) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching testimonials', error });
    }
};

export const getFeatures = async (req: Request, res: Response) => {
    try {
        const features = await Feature.find();
        res.json(features);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching features', error });
    }
};

export const getHowItWorks = async (req: Request, res: Response) => {
    try {
        const items = await HowItWork.find().sort({ step: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching how it works', error });
    }
};
