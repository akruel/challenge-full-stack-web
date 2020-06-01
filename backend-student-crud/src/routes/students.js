const router = require('express').Router();
const StudentsController = require('../app/controllers/StudentsController');
const StudensSchema = require('./schemas/StudentsSchema');

router.post('/', StudensSchema.create, StudentsController.create);
router.get('/', StudentsController.read);
router.get('/:id', StudentsController.getOne);
router.put('/:id', StudensSchema.update, StudentsController.update);
router.delete('/:id', StudentsController.delete);

module.exports = router;
