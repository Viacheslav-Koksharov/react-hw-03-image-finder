import { Component } from 'react';
import PropTypes from 'prop-types';
// import s from './Button.module.css';

class Button extends Component {
  loading = () => {
    const { onClick, page } = this.props;
    onClick(page);
  };

  render() {
    return (
      <button className="Button" type="button" onClick={this.loading}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Button;
