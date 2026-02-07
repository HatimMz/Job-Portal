import React, { useEffect, useRef, useState } from 'react'
import JobItem from './JobItem'
import Addjob from './Addjob'

const Jobs = () => {

  const [jobs, setJobs] = useState([])

  const getJobs = async () => {
    const response = await fetch("http://localhost:3000/jobs", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json()
    setJobs(json)
  }

  useEffect(() => {
    getJobs()
    // eslint-disable-next-line
  }, [])


  const editjob = async (id, title, company, description, location, salary) => {

    const response = await fetch(`http://localhost:3000/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, company, description, location, salary })
    });
    // const json = await response.json();

    let newjobs = JSON.parse(JSON.stringify(jobs))
    for (let index = 0; index < newjobs.length; index++) {
      const element = newjobs[index];
      if (element._id === id) {
        newjobs[index].title = title;
        newjobs[index].company = company;
        newjobs[index].description = description;
        newjobs[index].location = location;
        newjobs[index].salary = salary;
        break;
      }
    }
    setJobs(newjobs);
  }

  const ref = useRef(null)
  const refClose = useRef(null)
  const [job, setJob] = useState({ id: "", etitle: "", ecompany: "", edescription: "", elocation: "", esalary: 0 })

  const updateJob = (currentJob) => {
    ref.current.click();
    setJob({ id: currentJob._id, etitle: currentJob.title, ecompany: currentJob.company, edescription: currentJob.description, elocation: currentJob.location, esalary: currentJob.salary })
  }

  const handleClick = (e) => {
    editjob(job.id, job.etitle, job.ecompany, job.edescription, job.elocation, job.esalary)
    refClose.current.click();
  }

  const onChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value })
  }

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Job</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className='row'>
                  <div className="mb-3 col">
                    <label className="form-label text-primary">Title</label>
                    <input type="text" className="form-control" name='etitle' value={job.etitle} onChange={onChange} required />
                  </div>

                  <div className="mb-3 col">
                    <label className="form-label text-primary">Company</label>
                    <input type="text" className="form-control" name="ecompany" value={job.ecompany} onChange={onChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-primary">Description</label>
                  <textarea rows={5} className="form-control" name="edescription" value={job.edescription} onChange={onChange} />
                </div>

                <div className='row'>
                  <div className="mb-3 col-9">
                    <label className="form-label text-primary">Location</label>
                    <input type="text" className="form-control" name="elocation" value={job.elocation} onChange={onChange} required />
                  </div>

                  <div className="mb-3 col">
                    <label className="form-label text-primary">Salary</label>
                    <input type="number" className="form-control" name="esalary" value={job.esalary} onChange={onChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={job.etitle.length===0} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>



      <div className='mt-3 row'>
        <Addjob setJobs={setJobs} jobs={jobs} />
        <h2 className='mt-3'>
          Available Jobs
        </h2>
        <div className="container mx-2">
          {jobs.length === 0 && 'No jobs to display'}
        </div>
        {jobs.map((job) => {
          return <JobItem key={job._id} job={job} jobs={jobs} setJobs={setJobs} updateJob={updateJob} />
        })}
      </div>
    </>
  )
}

export default Jobs
