import express from 'express';
import { createShortUrl } from '../controller/short_url.controller.js';
const router = express.Router();

router.post("/",createShortUrl);

// flow of short url creation : controller (createShortUrl) -> 
// service (createShortUrlWithUser || createShortUrlWithoutUser) -> model (createShortUrl)

export default router;