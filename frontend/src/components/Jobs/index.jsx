import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./jobs.css";
import Job from "./../../Assets/jobs.json";
import Filter from "../Filter";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const JobData = JSON.parse(sessionStorage.getItem("item")) || [];
  const [filteredJobs, setFilteredJobs] = useState([...JobData, ...Job]);
  const [searchterm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // State for selected job
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close

  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    setFilteredJobs(
      Job.filter((job) => {
        return job.role === value;
      })
    );
  }

  function saveClick(id, logo, company, position, location, posted) {
    window.localStorage.setItem(
      "Job",
      JSON.stringify(id, logo, company, position, location, posted)
    );
    console.log(JobData);
  }

  const searchEvent = (event) => {
    const data = event.target.value;
    setSearchTerm(data);
    if (searchterm !== "" || searchterm.length > 2) {
      const filterData = Job.filter((item) => {
        if (item) {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchterm.toLowerCase());
        } else {
          return 0;
        }
      });
      setFilteredJobs(filterData);
    } else {
      setFilteredJobs(Job);
    }
  };

  function handleExperienceFilter(checkedState) {
    let filters = [];
    checkedState.forEach((item, index) => {
      if (item === true) {
        const filterS = Job.filter((job) => {
          return (
            job.experience >= experience[index].min &&
            job.experience <= experience[index].max
          );
        });
        filters = [...filters, ...filterS];
      }
      setFilteredJobs(filters);
    });
  }

  // Modal open/close handler
  function openModal(job) {
    setSelectedJob(job);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedJob(null);
  }

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredJobs.map(
              ({ id, logo, company, position, location, posted, role }) => {
                return (
                  <div className="job-list" key={id}>
                    <div
                      className="job-card"
                      onClick={() => openModal({ id, logo, company, position, location, posted, role })}
                    >
                      <div className="job-name">
                        <img
                          src={
                            logo.length > 20
                              ? logo
                              : require(`../../Assets/images/${logo}`)
                          }
                          alt="logo"
                          className="job-profile"
                        />
                        <div className="job-detail">
                          <h4>{company}</h4>
                          <h3>{position}</h3>
                          <div className="category">
                            <p>{location}</p>
                            <p>{role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="job-button">
                        <div className="job-posting">
                          <Link to="/apply-jobs" className="apply-link">Apply Now</Link>
                        </div>
                        <div className="save-button">
                          <Link
                            to="/Jobs"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent modal open on save click
                              saveClick(
                                {
                                  id,
                                  logo,
                                  company,
                                  position,
                                  location,
                                  posted,
                                },
                                setActive(!active)
                              );
                            }}
                          >
                            {JSON.parse(sessionStorage.getItem("Job"))?.id ===
                            id ? (
                              <AiFillHeart />
                            ) : (
                              <AiOutlineHeart />
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <Filter
            setFilteredJobs={setFilteredJobs}
            handleJobFilter={handleJobFilter}
            handleExperienceFilter={handleExperienceFilter}
            searchEvent={searchEvent}
          />

          {/* Modal for job details */}
          {isModalOpen && selectedJob && (
            <div className="job-modal">
              <div className="modal-content">
                <span className="close-button" onClick={closeModal}>
                  &times;
                </span>
                <h3>{selectedJob.position}</h3>
                <p><strong>Company:</strong> {selectedJob.company}</p>
                <p><strong>Location:</strong> {selectedJob.location}</p>
                <p><strong>Role:</strong> {selectedJob.role}</p>
                <p><strong>Posted:</strong> {selectedJob.posted}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
