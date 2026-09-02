// src/router/SMS_Route/route.js
import express from 'express';
import SMS_Controllers from '../../controllers/SMS_Controllers/SMS_Controllers.js';
import Verify_Controllers from '../../controllers/SMS_Controllers/Verify_Controllers.js';

import { smsLimiter , authLimiter } from "../../middlewares/RateLimitMiddleware/rateLimit.js"

const router = express.Router();

router.post('/auth/send-code', smsLimiter , SMS_Controllers);

router.post('/auth/verify-code', authLimiter ,Verify_Controllers);

export default router;