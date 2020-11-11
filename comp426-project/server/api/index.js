const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit'); // Limits allowed calls for x amount of ms
const slowDown = require('express-slow-down'); // Slows each following request if spammed
const axios = require('axios'); // Use axios to make http requests
// const example = require('./example.js'); ==> load specifc api file

const limiter = rateLimit({
	windowMs: 30 * 1000,
	max: 10,
});

const speedLimiter = slowDown({
	windowMs: 30 * 1000,
	delayAfter: 1,
	delayMs: 500
});

router.get('/', limiter, speedLimiter, (req, res) => {
	res.json({
		message: 'API - 👋🌎🌍🌏'
	});
});

// router.use('/example-path', example); ==> to be routed to: api/chosen_path for example

module.exports = router;