import { useState } from "react";

const Addjob = ({ setJobs }) => {

    const [job, setjob] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: 0
    });

    const onChange = (e) => {
        const value = e.target.name === "salary" ? Number(e.target.value) : e.target.value;
        setjob({ ...job, [e.target.name]: value });
    };

    const addjob = async () => {
        const response = await fetch("http://localhost:3000/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job)
        });

        const savedJob = await response.json();
        setJobs(prevJobs => [...prevJobs, savedJob]);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        await addjob();
        setjob({ title: "", company: "", description: "", location: "", salary: 0 });
    };

    return (
        <form onSubmit={handleClick}>
            <div className='row'>
                <div className="mb-3 col">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' value={job.title} onChange={onChange} required />
                </div>

                <div className="mb-3 col">
                    <label className="form-label">Company</label>
                    <input type="text" className="form-control" name="company" value={job.company} onChange={onChange} required />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea rows={5} className="form-control" name="description" value={job.description} onChange={onChange} />
            </div>

            <div className='row'>
                <div className="mb-3 col-9">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" name="location" value={job.location} onChange={onChange} required />
                </div>

                <div className="mb-3 col">
                    <label className="form-label">Salary</label>
                    <input type="number" className="form-control" name="salary" value={job.salary} onChange={onChange} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Post Job</button>
        </form>
    );
};

export default Addjob;
