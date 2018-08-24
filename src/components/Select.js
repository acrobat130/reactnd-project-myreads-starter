import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveToShelf: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    value: PropTypes.string,
  };

  handleOnChange = (e) => {
    const { book, moveToShelf } = this.props;

    moveToShelf(book, e.target.value);
  };

  renderOptions = (options) => {
    return options.map((option) => {
      const { value, text, ...extraAttributes } = option;

      return (
        <option key={option.value} value={value} {...extraAttributes}>
          {text}
        </option>
      );
    });
  };

  render() {
    const { value, options } = this.props;

    return (
      <select onChange={this.handleOnChange} value={value}>
        {this.renderOptions(options)}
      </select>
    );
  }
}

export default Select;
