const express = require(`express`);
const router = express.Router();
const userRoutes = require(`./users`);
const genRoutes = require(`./general`);

router.use(`/api/user`, userRoutes);

//private routes
router.use(`/api/ffa`, genRoutes);

module.exports = router;
