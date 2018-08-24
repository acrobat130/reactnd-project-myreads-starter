import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash.startcase';
import Select from './Select';

class Book extends Component {
  static propTypes = {
    allShelfKeys: PropTypes.arrayOf(PropTypes.string),
    bookData: PropTypes.shape({
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
    moveToShelf: PropTypes.func.isRequired,
    shelfKey: PropTypes.string.isRequired,
  };

  generateBookshelfChangerOptions = () => {
    const { allShelfKeys } = this.props;
    const firstOption = {
      value: 'move',
      text: 'Move to...',
      disabled: 'disabled',
    };
    const lastOption = {
      value: 'none',
      text: 'None',
    };
    const options = allShelfKeys.map((shelfName) => ({
      value: shelfName,
      text: startCase(shelfName),
    }));

    options.unshift(firstOption);
    options.push(lastOption);

    return options;
  };

  render() {
    const { bookData, moveToShelf, shelfKey } = this.props;
    const { authors, imageUrl, title } = bookData;
    const bookshelfChangerOptions = this.generateBookshelfChangerOptions();

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <img
              className="book-cover"
              src={imageUrl}
              alt={title}
              style={{ width: 128, height: 193 }}
            />
            <div className="book-shelf-changer">
              <Select
                book={bookData}
                moveToShelf={moveToShelf}
                options={bookshelfChangerOptions}
                value={shelfKey}
              />
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors.join(', ')}</div>
        </div>
      </li>
    );
  }
}

export default Book;
