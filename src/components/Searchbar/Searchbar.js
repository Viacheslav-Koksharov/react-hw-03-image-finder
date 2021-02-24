import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChangeForm = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('Try again!', { className: `${s.toastify}` });
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChangeForm}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
