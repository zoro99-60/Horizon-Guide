import { Request, Response } from 'express';
import QuizQuestion from '../models/QuizQuestion';

export const getQuizQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await QuizQuestion.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz questions', error });
    }
};
