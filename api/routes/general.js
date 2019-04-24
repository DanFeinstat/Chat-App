const express = require(`express`);
const router = express.Router();
const genchatController = require(`../controller/general`);
// const app = express();
const jwt = require(`jsonwebtoken`);

function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get(process.env.SECRET),
    function(err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}

router.get(`/`, validateUser, genchatController.getComments);
router.post(`/`, validateUser, genchatController.addComment);

module.exports = router;
