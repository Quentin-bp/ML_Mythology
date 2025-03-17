
import React from 'react';
import "./Button.css"
function Button({ label, onClick}) {
    return (
        <>
            <div className="button button--piyo" style={{ scale: "0.8" }} onClick={onClick}>
                <div className="button__wrapper">
                    <span className="button__text">{label}</span>
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
        </>
    );
};

export default Button;

Button.defaultProps = {
    className: "validate",
    type: "button",
    disabled: false,
    style: {}
}

/*

                        <div className="button button--piyo" style={{ scale: "0.8" }} onClick={onClick}>
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
                        */