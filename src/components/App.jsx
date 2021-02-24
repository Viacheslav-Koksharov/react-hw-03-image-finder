import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery, page } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} page={page} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick="true"
        />
      </>
    );
  }
}
