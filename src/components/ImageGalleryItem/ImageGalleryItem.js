import React from 'react';
import PropTypes from 'prop-types';
// import s from '../ContactItem/ContactItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
