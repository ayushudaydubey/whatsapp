const { userRegister, userLogin } = require("../controllers/user.controller");

const router = require("express").Router();

// const router = express.Router();

router.post("/create", userRegister);

router.post("/login", userLogin);

module.exports = router;
