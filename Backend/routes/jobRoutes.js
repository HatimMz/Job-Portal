const express = require('express');
const router = express.Router();
const controllers = require('../controllers/jobController');

router.post('/', controllers.createJob);
router.get('/', controllers.getAllJobs);
router.get('/:id', controllers.getJobById);
router.put('/:id', controllers.updateJob);
router.delete('/:id', controllers.deleteJob);

module.exports = router;