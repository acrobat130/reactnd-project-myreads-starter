import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from '../utils/lodash';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class Bookshelves extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    allShelfKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    bookshelvesData: PropTypes.objectOf(PropTypes.array).isRequired,
    moveToShelf: PropTypes.func.isRequired,
  };

  render() {
    const { allBooks, allShelfKeys, bookshelvesData, moveToShelf } = this.props;
    const bookshelves = _.map(bookshelvesData, (bookIds, shelfKey) => {
      const title = _.startCase(shelfKey);
      const booksOnShelf = bookIds.map((id) =>
        allBooks.find((book) => id === book.id)
      );

      return (
        <Bookshelf
          allShelfKeys={allShelfKeys}
          booksData={booksOnShelf}
          key={shelfKey}
          moveToShelf={moveToShelf}
          shelfKey={shelfKey}
          title={title}
        />
      );
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>{bookshelves}</div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Bookshelves;
