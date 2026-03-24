import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Domain from './models/Domain';
import Stat from './models/Stat';
import Testimonial from './models/Testimonial';
import Discussion from './models/Discussion';
import QuizQuestion from './models/QuizQuestion';
import Feature from './models/Feature';
import HowItWork from './models/HowItWork';
import RoadmapTemplate from './models/RoadmapTemplate';
import Company from './models/Company';

// Import the raw data from the frontend mock file
// NOTE: In a real scenario, we might need to adjust the import path or copy the data
// because a server-side script can't directly 'import' from a TSX-heavy frontend easily.
// I'll create a standalone data file for seeding.
import {
    domains,
    stats,
    testimonials,
    discussions,
    quizQuestions,
    features,
    howItWorks,
    roadmapTemplates,
    companies
} from './data/seedData';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/horizonguide';

const seedDatabase = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Domain.deleteMany({});
        await Stat.deleteMany({});
        await Testimonial.deleteMany({});
        await Discussion.deleteMany({});
        await QuizQuestion.deleteMany({});
        await Feature.deleteMany({});
        await HowItWork.deleteMany({});
        await RoadmapTemplate.deleteMany({});
        await Company.deleteMany({});

        // Insertion
        await Domain.insertMany(domains);
        await Stat.insertMany(stats);
        await Testimonial.insertMany(testimonials);
        await Discussion.insertMany(discussions);
        await QuizQuestion.insertMany(quizQuestions.map((q: any) => ({
            ...q,
            options: q.options.map((o: any) => ({
                ...o,
                weights: Object.fromEntries(Object.entries(o.weights))
            }))
        })));
        await Feature.insertMany(features);
        await HowItWork.insertMany(howItWorks);
        await RoadmapTemplate.insertMany(roadmapTemplates);
        await Company.insertMany(companies);

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
