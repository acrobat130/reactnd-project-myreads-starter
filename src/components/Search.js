import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

const findShelfKey = (book, bookshelvesData) => {
  return (
    Object.keys(bookshelvesData).find((shelf) =>
      bookshelvesData[shelf].includes(book.id)
    ) || 'none'
  );
};

class Search extends Component {
  static propTypes = {
    allShelfKeys: PropTypes.array.isRequired,
    bookshelvesData: PropTypes.objectOf(PropTypes.array).isRequired,
    moveToShelf: PropTypes.func.isRequired,
    query: PropTypes.string,
    search: PropTypes.func.isRequired,
    searchResultBooksData: PropTypes.arrayOf(PropTypes.object.isRequired),
  };

  handleSearch = (e) => {
    const query = e.target.value;

    this.props.search(query);
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };
  /*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
  */
  render() {
    const {
      allShelfKeys,
      bookshelvesData,
      moveToShelf,
      query,
      searchResultBooksData,
    } = this.props;
    const searchResultBooks = searchResultBooksData.map((bookData) => {
      const { id } = bookData;
      const shelfKey = findShelfKey(bookData, bookshelvesData);

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

    // TODO: Learn about DebounceInput in React as it helps to reduce the number of useless network calls to the server. https://blog.revathskumar.com/2016/02/reactjs-using-debounce-in-react-components.html
    // TODO: Display "Books not found" in case of search error. Hint: You may need to use another state to separate the case from blank query.
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <form onSubmit={this.handleSubmit}>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.handleSearch}
                value={query}
              />
            </div>
          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{searchResultBooks}</ol>
        </div>
      </div>
    );
  }
}

export default Search;
