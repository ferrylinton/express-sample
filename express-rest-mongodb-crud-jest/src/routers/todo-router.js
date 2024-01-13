const express = require('express');
const todoController = require('../controllers/todo-controller');

const router = express.Router();

router.get('/', todoController.find);
router.post('/', todoController.create);
router.get("/:_id", todoController.findById);
router.put("/:_id", todoController.update);
router.delete("/:_id",todoController.deleteById);

module.exports = router;