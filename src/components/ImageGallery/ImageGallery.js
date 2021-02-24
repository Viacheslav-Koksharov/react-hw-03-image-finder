import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import fetchImg from '../../services/fetch';
import { toast } from 'react-toastify';
import Spinner from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    page: this.props.page,
    images: [],
    error: null,
    status: 'idle',
    largeImageURL: null,
    tags: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ status: 'pending' });

      if (searchQuery.trim() !== '') {
        fetchImg(searchQuery, page)
          .then(images => {
            if (images.length === 0) {
              this.setState({ status: 'rejected' });
              toast.error('Идите в жопу с таким запросом', {
                className: `${s.toastify}`,
              });
              return;
            }
            this.setState(prevState => ({
              images: [...images],
              page: page + 1,
              status: 'resolved',
            }));
          })
          .catch(this.errorMessage);
      } else {
        this.setState({ status: 'idle' });
      }
    }
  }

  onClick = () => {
    const { page } = this.state;
    const { searchQuery } = this.props;

    fetchImg(searchQuery, page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: page + 1,
          status: 'resolved',
        }));
        this.scrollTo();
      })
      .catch(this.errorMessage);
  };
  errorMessage = error => {
    this.setState({ error: error.message, status: 'rejected' });
    toast.error(this.state.error);
  };
  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  selectedImage = e => {
    if (e.target.nodeName === 'IMG') {
      const selectedImage = this.state.images.find(
        image => image.id === Number(e.target.id),
      );
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        largeImageURL: selectedImage.largeImageURL,
        tags: selectedImage.tags,
      }));
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: null,
      tags: null,
    }));
  };

  render() {
    const { page, images, showModal, largeImageURL, tags, status } = this.state;

    if (status === 'idle' || status === 'rejected') return null;
    if (status === 'pending') return <Spinner />;
    if (status === 'resolved' && images.length > 0) {
      return (
        <>
          <ul className={s.imageGallery} onClick={this.selectedImage}>
            {images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
          </ul>
          {<Button page={page} onClick={this.onClick} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
