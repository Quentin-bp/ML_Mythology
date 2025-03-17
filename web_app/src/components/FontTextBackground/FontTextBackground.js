import React from 'react';
import "./FontTextBackground.css"
import FontText from '../../images/text_font.jpg'
function FontTextBackground({ description, main, description_modal, onClick }) {
    const classNamePrefix = "font_text_main ";

    return (
        <>
            <div className={classNamePrefix}>
                <img src={FontText} /><br></br>
                <div className="text_container">{description} <br></br><br></br>
                    <span className="title">{main} </span></div>
                    {

                        description_modal &&
                        <div className="button button--piyo" style={{ scale: "0.8", position : "absolute", bottom : "5%" }}onClick={onClick}>
                            <div className="button__wrapper">
                                <span className="button__text">{description_modal}</span>
                            </div>
                            <div className="characterBox">
                                <div className="character wakeup">
                                    <div className="character__face"></div>
                                </div>
                                <div className="character wakeup">
                                    <div className="character__face"></div>
                                </div>
                                <div className="character">
                                    <div className="character__face"></div>
                                </div>
                            </div>
                        </div>
                    }
                
            </div>

        </>
    );
};

export default FontTextBackground;
