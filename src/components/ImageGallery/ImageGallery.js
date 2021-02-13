import React, { Component } from 'react';
import fetchImg from '../../services/fetch';
// import { toast } from 'react-toastify';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    largeImageURL: null,
    tags: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      const { page } = this.state;
      const { searchQuery } = this.props;

      fetchImg(searchQuery, page)
        .then(images => {
          this.setState(prevState => ({
            images: [...images],
            page: this.state.page + 1,
            status: 'resolved',
          }));
        })
        .catch(error => alert(error.message));
    }
  }

  onClick = () => {
    const { page } = this.state;
    const { searchQuery } = this.props;

    fetchImg(searchQuery, page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: this.state.page + 1,
          status: 'resolved',
        }));
        this.scrollTo();
      })
      .catch(error => alert(error.message));
  };

  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = e => {
    this.setState(({ showModal, largeImageURL, tags }) => ({
      showModal: !showModal,
      // largeImageURL: e.currentTarget.largeImageURL,
      // tags: e.currentTarget.tags,
    }));
  };

  render() {
    const {
      images,
      showModal,
      largeImageURL,
      tags,
      error,
      status,
    } = this.state;
    if (status === 'idle') return null;
    if (status === 'pending') return <Spinner />;
    if (status === 'rejected')
      return <p>Whoops, something went wrong: {error.message}</p>;
    if (status === 'resolved')
      return (
        <>
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
          </ul>
          {<Button onClick={this.onClick} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </>
      );
  }
}
