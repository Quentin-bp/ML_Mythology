import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./particles.scss"
import ContextFont from "../images/ContextFont.png";
import SaisieFont from "../images/SaisieFont.gif";
import GenerationFont from "../images/GenerationFont.gif";
function Home() {
    const navigate = useNavigate();

    return (
        <div>

            <div id="home_page" style={{display: 'flex'}}>
                
                <div className="container_context" style={{ left: "30%" ,bottom: "250px" }} onClick={() => { navigate("/context") }}>
                    <div className="title_context click-me">Il était une fois...</div><br />
                    <div className="stars-container">
                        <img src={ContextFont} className="context_picture" />
                        <div className="star star-1"></div>
                        <div className="star star-2"></div>
                        <div className="star star-3"></div>
                        <div className="star star-4"></div>
                        <div className="star star-5"></div>
                    </div>
                </div>
                <div className="container_context" style={{ right: "80%" ,top: "200px" }} onClick={() => { navigate("/profil") }}>
                    <div className="title_context click-me">Un Nom, une Histoire</div><br />
                    <img src={SaisieFont} className="context_picture" />
                </div>
                <div className="container_context" style={{ left: "40%",top: "200px"  }} onClick={() => { navigate("/research") }}>
                    <div className="title_context click-me">Un équilibre entre Réalité et Idéal</div><br />
                    <img src={GenerationFont} className="context_picture" />
                </div>
            </div>
        </div>
    );
};

export default Home;