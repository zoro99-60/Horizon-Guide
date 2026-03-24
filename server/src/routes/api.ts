import { Router } from 'express';
import * as domainController from '../controllers/domainController';
import * as contentController from '../controllers/contentController';
import * as communityController from '../controllers/communityController';
import * as quizController from '../controllers/quizController';
import * as roadmapController from '../controllers/roadmapController';
import * as authController from "../controllers/authController";

const router = Router();

// Domain routes
router.get('/domains', domainController.getDomains);
router.get('/domains/:id', domainController.getDomainById);
router.get('/stats', contentController.getStats);
router.get('/test', (req, res) => res.json({ message: "API router is working" }));

// Content routes
router.get("/health", (req, res) => res.json({ status: "ok" }));

// Auth
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/2fa/setup", authController.setup2FA);
router.post("/auth/2fa/verify", authController.verify2FA);
router.get('/testimonials', contentController.getTestimonials);
router.get('/features', contentController.getFeatures);
router.get('/how-it-works', contentController.getHowItWorks);

// Community routes
router.get('/discussions', communityController.getDiscussions);
router.get('/discussions/featured', communityController.getFeaturedDiscussions);

// Quiz routes
router.get('/quiz', quizController.getQuizQuestions);

// Roadmaps & Companies
router.get('/roadmaps/:domainId', roadmapController.getRoadmapByDomain);
router.get('/companies/:domainId', roadmapController.getCompaniesByDomain);

export default router;
