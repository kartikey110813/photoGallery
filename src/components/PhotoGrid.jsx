import React from "react";

const PhotoGrid = ({ images }) => {
  return (
    <>
      <div className="grid-wrap">
        <ul>
          {images.map((image) => (
            <li className="item" key={image.id}>
              <img
                className="img"
                key={image.id}
                src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PhotoGrid;
