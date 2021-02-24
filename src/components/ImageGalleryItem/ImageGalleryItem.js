import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <li className={s.imageGalleryItem}>
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        className={s.imageGalleryItemImage}
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
