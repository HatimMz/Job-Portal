const Job = require('../models/Job.js');


exports.createJob = async (req, res) => {
    try {
        const { title, company, location, salary, description } = req.body;

        const job = await Job.create({
            title,
            company,
            location,
            salary,
            description,
        });

        
        res.status(201).json(job); 
        
    } catch (err) {
        
        res.status(400).json({ error: err.message });
    }
};

exports.getAllJobs = async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
};

exports.getJobById = async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
};


exports.updateJob = async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json({success:true, message:"job updated", updatedJob});
};


exports.deleteJob = async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job Deleted" });
};