import React from 'react';
import "./FontBookBackground.css"
import FontBook from '../../images/font_book1.jpg'
function FontBookBackground({ description, main, className,  description_modal, onClick}) {
    const classNamePrefix = "font_book_main ";

    return (
        <>
            <div className={classNamePrefix + ( className??"") }>
                <img src={FontBook} /><br></br>
                <div className="text_container">{description} <br></br><br></br>
                    <span className="title">{main} </span> </div>
                {

                    description_modal &&
                    <div className="button button--piyo" style={{ scale: "0.8", position : "absolute", bottom : "20%", left : "15%" }} onClick={onClick}>
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

export default FontBookBackground;
