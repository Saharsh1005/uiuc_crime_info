import React from "react";
import "./styles.css";
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import {toast } from 'react-toastify';
export const Navigation = () => {
    const { user,setUser  } = useUser();
    const navigate = useNavigate();
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navigation');
        const scrollTop = window.pageYOffset;
        const scrolledClass = 'scrolled';
      
        if (scrollTop > 50) { 
          navbar.classList.add(scrolledClass);
        } else {
          navbar.classList.remove(scrolledClass);
        }
      });
      const handleLogout = async () => {
        try {
            const token = user.token; 
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.get('http://127.0.0.1:8000/logout/', {}, config);
            setUser(null);
            toast.success("Logout successful!");
            navigate('/');
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };
    return (
        <Navbar collapseOnSelect expand="lg" className="navigation" fixed="top">
            <Container>
            <LinkContainer to="/">
                <Navbar.Brand className="mr-auto">
                    <span className="safe-zone-uof-i">
                        <span className="text-wrapper-13">Safe</span>
                        <span className="text-wrapper-14">&nbsp;</span>
                        <span className="text-wrapper-13">Zone</span>
                        <span className="text-wrapper-14">&nbsp;</span>
                        <span className="text-wrapper-15">Uof</span>
                        <span className="text-wrapper-14">&nbsp;</span>
                        <span className="text-wrapper-15">I</span>
                    </span>
                </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        {user && (
                            <LinkContainer to="/insights">
                                <Nav.Link>Insights</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && user.is_admin &&(<LinkContainer to="/admin">
                            <Nav.Link>Admin Control</Nav.Link>
                        </LinkContainer>)}
                        {user && !user.is_admin && (
                            <LinkContainer to="/reportacrime">
                                <Nav.Link>Report a Crime</Nav.Link>
                            </LinkContainer>
                        )}
                         {user ? (
                            <LinkContainer to="/">
                                <Nav.Link onClick={handleLogout}><button className="register text-wrapper-17">Sign Out</button></Nav.Link>
                            </LinkContainer>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link><button className="register text-wrapper-17">Login</button></Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};



export default Navigation;
