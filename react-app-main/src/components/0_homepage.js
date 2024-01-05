import React from "react";
import { Accordion } from 'react-bootstrap';
import "../css/0_homepage.css";
import Footer from "../common/footer";
import { useUser } from '../components/UserContext';
export const ElementHomePage = () => {
    const { user } = useUser();
    return (
        <div>
            <div className="element-home-page">
                <div className="div-2">
                    <div className="overlap">
                        <p className="empowering-safety">
                            <span className="span">
                                Empowering safety, one click at a time - Explore your secure campus companion!
                                <br />
                            </span>
                            <span className="text-wrapper-5">
                                <br />
                            </span>
                            <span className="text-wrapper-6">Last month, your watchful eyes reported</span>
                            <span className="text-wrapper-5">&nbsp;</span>
                            <span className="text-wrapper-7">100</span>
                            <span className="text-wrapper-5">&nbsp;</span>
                            <span className="text-wrapper-6">incidents, shaping a safer tomorrow together</span>
                        </p>
                        {!user && (<p className="text-wrapper-8">Please Note: To report crime tips and view insights, please login above</p>)}
                    </div>
                    <div className="frame">
                        <div className="map-heading">
                            <div className="text-wrapper-11">CRIME MAP</div>
                        </div>
                        <hr></hr>
                        <div className="map-group">
                            <div className="group">
                                <div className="figmap">
                                    <div className="map-wrapping-container">
                                        <div id="map-container">
                                            <iframe title="map" className="crime-map drop-shadow" src="https://uiuccrimemap.herokuapp.com/" frameborder="0" allowfullscreen="allowfullscreen"><br />
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="FAQ-group">
                        <div className="map-heading-2">
                            <div className="text-wrapper-11">FAQs</div>
                            <hr></hr>
                        </div>
                        <div className="frame-2">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header> From where is the crime data sourced? </Accordion.Header>
                                    <Accordion.Body>
                                        The crime data is sourced from the official UIUC daily crime log website.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Can I contribute data or report incidents through the app?</Accordion.Header>
                                    <Accordion.Body>
                                        While direct data contribution is not supported, users can submit  crime tips to our database.
                                        These tips are accessible to  official authorities. Additionally, important contact numbers
                                        for authorities are provided in our footer.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>What features does our app provide?</Accordion.Header>
                                    <Accordion.Body>
                                        Our app offers three main features: the ability to view crime insights  on a map, access charts for deeper
                                        insights, and report a crime or tip  to the appropriate authority.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};
export default ElementHomePage;