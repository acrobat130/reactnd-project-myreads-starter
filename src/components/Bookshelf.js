import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    allShelfKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    booksData: PropTypes.arrayOf(PropTypes.object.isRequired),
    moveToShelf: PropTypes.func.isRequired,
    shelfKey: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const {
      allShelfKeys,
      booksData,
      moveToShelf,
      shelfKey,
      title,
    } = this.props;
    const books = booksData.map((bookData) => {
      const { id } = bookData;

      return (
        <Book
          allShelfKeys={allShelfKeys}
          bookData={bookData}
          key={id}
          moveToShelf={moveToShelf}
          shelfKey={shelfKey}
        />
      );
    });

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{books}</ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
