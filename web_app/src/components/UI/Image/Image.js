import React from 'react';
import "./Image.css"
function Image({ legend, image, onClick, className, style, classNameImageList, classNameList }) {
    const classNamePrefix = "image_main ";

    return (
        <div className={"image_container " +( classNameList ? classNameList : "")}>
            <div className="border_image">
                <img style={style} className={classNamePrefix + (classNameImageList ? classNameImageList : "")} src={image} onClick={onClick} /><br></br>
                <div className="legend_image">{legend} </div>
            </div>
        </div>
    );
};

export default Image;

Image.defaultProps = {

}