import React, { useState } from 'react';
import './apply.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";


const ApplyJobs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const OnformSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !position || !coverLetter || !acceptedTerms) {
      alert("Please fill all required fields and accept the terms and conditions.");
    } else {
      alert("Your Job Application has been applied successfully!");
      navigate("/Jobs");
    }
  };

  return (
    <>
    <Navbar />
    <div className="apply-job">
      <div className="container">
        <header className="header">
          <h1 className="post-job">Job Application Form</h1>
        </header>
        <form onSubmit={OnformSubmit}>
          <div className="form-group">
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Enter Your Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              className="form-control"
              placeholder="Enter Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Job Position</label>
            <input
              type="text"
              name="position"
              value={position}
              className="form-control"
              placeholder="Enter Job Position"
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter</label>
            <textarea
              name="coverLetter"
              value={coverLetter}
              className="form-control input-textarea"
              placeholder="Write your cover letter here..."
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="resume">Upload Your Resume</label>
            <input type="file" id="myFile" name="resume" required />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                required
              />
              I confirm that the information provided is accurate.
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ApplyJobs;
