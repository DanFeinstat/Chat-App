const express = require(`express`);
const router = express.Router();
const userController = require(`../controller/users`);

router.post(`/register`, userController.create);
router.post(`/authenticate`, userController.authenticate);
router.put(`/socket`, userController.updateSocketId);
router.get(`/userlist`, userController.findAll);

module.exports = router;
