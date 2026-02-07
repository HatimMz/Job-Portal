import React from 'react'

const JobItem = (props) => {

    const { jobs, job, setJobs, updateJob } = props

    const deletejob = async (id) => {
        const response = await fetch(`http://localhost:3000/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // const json = await response.json();
        const newjobs = jobs.filter((j) => { return j._id !== id })
        setJobs(newjobs)
    }




    return (
        <div className="card shadow-sm mb-3" style={{ maxWidth: "100%" }}>
            <div className="card-body">

                <h5 className="card-title fw-bold mb-2">{job.title}</h5>

                <p className="card-text text-muted" style={{ fontSize: "0.95rem" }}>
                    {job.description}
                </p>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <div className="border rounded p-2 h-100 bg-light">
                            <small className="text-muted d-block">Company</small>
                            <strong>{job.company}</strong>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="border rounded p-2 h-100 bg-light">
                            <small className="text-muted d-block">Location</small>
                            <strong>{job.location}</strong>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="border rounded p-2 h-100 bg-light">
                            <small className="text-muted d-block">Salary</small>
                            <strong>${job.salary}</strong>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => updateJob(job)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deletejob(job._id)}
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>

    )
}

export default JobItem
