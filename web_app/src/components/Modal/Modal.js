// @src/components/Modal.jsx
import { CgClose } from 'react-icons/cg';

import React from "react";
import "./Modal.css";

const Modal = ({ setIsOpen, title, img, legend, imgClass, links }) => {
    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">{title}</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsOpen(false)}>
                        <CgClose></CgClose>
                    </button>
                    <div className="modalContent" >
                        <img src={img} className={imgClass ? imgClass : ""} style={{ borderRadius: "15px" }}></img>
                        <div className="legend_modal">{legend} </div>
                        {
                            Array.isArray(links) ?
                                links.map((link, i) => {
                                    return <div className="legend_modal link_modal"><a href={link.url} target="_blank" >{link.label}</a></div>
                                })

                                :
                                null
                        }
                    </div>
                </div>
            </div>

        </>
    );
};

export default Modal;
