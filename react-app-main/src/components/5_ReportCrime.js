import React, { useState } from "react";
import "../css/5_report.css";
import Footer from "../common/footer";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../components/UserContext';
import {toast } from 'react-toastify';
const ReportCrimeForm = () => {
  const [dateAndTime, setDateAndTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { user} = useUser();
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!dateAndTime || !title || !description) {
      alert("Please enter all required fields: Date and Time, Title, and Description");
      return;
    }
    var date = new Date(dateAndTime);
    var milliseconds = date.getTime();
    const tipData = {
      'date_of_crime':milliseconds,
      'title': title,
      'description': description
    };

    try {
      const token = user.token; 
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };
      await axios.post('http://127.0.0.1:8000/add-tip/', tipData, config);
      toast.success("Crime Report Submitted Successfully!");
      navigate('/thankyou');
  } catch (error) {
    toast.error("Error Submitting Report");
  }
  };

  return (
    <div>
      <div className='form-container'>
        <h1
    className="know"
    style={{
        fontFamily: "Newsreader",
        fontWeight: "600",
        fontSize: 30,
        textAlign: "center",
        color: "#002855",
    }}
    >
    Know anything about the recent crimes? Update the cops here!
    </h1>
        
      <form onSubmit={handleSubmit}>
      <br></br>
      <a
        href="/1_login.js"
        style={{
          fontFamily: "Newsreader",
          fontWeight: "600",
          fontSize: 20,
          textAlign: "center",
          color: "#666666",
         
        }}
      >
       <u>Are you an admin? Click here!</u> 
      </a>

<br></br>
<br></br>
<br></br>
        <div>
          <label
            htmlFor="dateAndTime"
            style={{
              fontFamily: "Newsreader",
              fontWeight: "600",
              fontSize: 20,
              textAlign: "left",
            }}
          className="required-label">
            Date and Time:
          </label>
          <input
            type="datetime-local"
            id="dateAndTime"
            value={dateAndTime}
            onChange={(event) => setDateAndTime(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label
            htmlFor="title"
            style={{
              fontFamily: "Newsreader",
              fontWeight: "600",
              fontSize: 20,
              textAlign: "left",
            }}
          className="required-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label
            htmlFor="description"
            style={{
              fontFamily: "Newsreader",
              fontWeight: "600",
              fontSize: 20,
              textAlign: "left",
            }}
          className="required-label">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
        <button type="submit" style={{ backgroundColor: "#002855" }} onClick={handleSubmit}>
  Submit
</button>
        </div>
      </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ReportCrimeForm;
