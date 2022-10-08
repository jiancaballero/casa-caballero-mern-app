const router = express.Router();
const controller = require("../controllers/users.controller");

// HTTP METHODS FOR ROOM
router.post("/users", controller.addUser);
module.exports = router;