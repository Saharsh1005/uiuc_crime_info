import React, { useState, useEffect } from "react";
import Footer from '../common/footer';
import '../css/6_admin_page.css';
import crimeImage from './assets/crime-6.png';
import crossIcon from './assets/cross.png';
import { Row, Col } from 'react-bootstrap';
import { useUser } from '../components/UserContext';
import axios from "axios";
import { toast } from 'react-toastify';
const Admin = () => {
  const [modals, setModals] = useState([]);
  const { user } = useUser();
  const deleteTip = async (index) => {
    const tip = modals[index];
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      await axios.delete(`http://127.0.0.1:8000/rem-tip/${tip.id}/`, config);

      const updatedModals = modals.filter((_, i) => i !== index);
      setModals(updatedModals);
      toast.success("Tip Deleted Successfully!");
    } catch (error) {
      toast.error("Error Deleting Tip");
    }
  };

  const buttonClass = (isReviewed) => {
    return isReviewed ? 'yellow-button' : 'green-button';
  };
  const changeTipStatus = async (index) => {
    const tip = modals[index];
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      await axios.put(`http://127.0.0.1:8000/accept-tip/${tip.id}/`, {}, config);
      try {
        const response = await axios.get('http://127.0.0.1:8000/all-tips/', config);
        setModals(response.data.data);
      } catch (error) {
        toast.error("Error Deleting Tip");
      }
      toast.success("Tip Status Updated!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const token = user.token;
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('http://127.0.0.1:8000/all-tips/', config);
        setModals(response.data.data);
      } catch (error) {
    toast.error("Error Deleting Tip");
      }
    };

    fetchTips();
  }, [user.token]);

  return (
    <div className="Admin">
      <div className='AdminContent'>
        <h1 className="AdminHeading">Admin Control Page</h1>
        <Row className="TipRow">
          {modals.map((modal, index) => (
            <Col md={4} lg={3} sm={12} className="TipBox" key={index}>
              <div className='close-div'>
                <button className="close-button" onClick={() => deleteTip(index)}>
                  <img src={crossIcon} alt='Close' className="cross" />
                </button>
              </div>
              <div className="TipDetails">
                <img src={crimeImage} className="TipImage" alt='Crime scene' />
                <h2 className='tipTitle'>{modal.title}</h2>
                <p className='tipDescription'>Date of Incident:{modal.date_of_crime}</p>
                <p className='tipDescription'>{modal.description}</p>
                <button
                  className={buttonClass(modal.is_reviewed)}
                  onClick={() => changeTipStatus(index)}
                >
                  {modal.is_reviewed ? 'In Review' : 'Accept'}
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Admin;
