import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './services/BooksAPI';
import {
  formatBooksData,
  generateShelves,
  generateBookshelvesData,
} from './services/books-api-helper';
import './App.css';
import Bookshelves from './components/Bookshelves';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    allShelfKeys: [],
    bookshelvesData: {},
    query: '',
    searchResultBooksData: [],
  };

  componentDidMount = () => {
    return BooksAPI.getAll().then((books) => {
      const allShelfKeys = generateShelves(books);
      const bookshelvesData = generateBookshelvesData(allShelfKeys, books);
      const formattedBooks = formatBooksData(books);

      this.setState({
        allBooks: formattedBooks,
        bookshelvesData,
        allShelfKeys,
      });
    });
  };

  updateAllBooks = (book, shelfKey) => {
    const { allBooks } = this.state;
    const updatedAllBooks = [...allBooks];
    const bookIndex = allBooks.findIndex((b) => b.id === book.id);

    if (bookIndex === -1) {
      updatedAllBooks.push(book);
    } else if (shelfKey === 'none') {
      updatedAllBooks.splice(bookIndex, 1);
    }

    return updatedAllBooks;
  };

  moveToShelf = (book, shelfKey) => {
    return BooksAPI.update(book, shelfKey).then((bookshelvesData) => {
      const updatedAllBooks = this.updateAllBooks(book, shelfKey);

      this.setState({
        allBooks: updatedAllBooks,
        bookshelvesData,
      });
    });
  };

  setQuery = (query) => {
    this.setState({ query });
  };

  resetSearchResults = () => {
    this.setState({ searchResultBooksData: [] });
  };

  search = (query) => {
    this.setQuery(query);

    if (query) {
      return BooksAPI.search(query).then((res) => {
        if (!res || res.error) {
          return this.resetSearchResults();
        }

        const searchResultBooksData = formatBooksData(res);

        this.setState({ searchResultBooksData });
      });
    }

    this.resetSearchResults();
  };

  render() {
    const {
      allBooks,
      allShelfKeys,
      bookshelvesData,
      query,
      searchResultBooksData,
    } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Bookshelves
              allBooks={allBooks}
              allShelfKeys={allShelfKeys}
              bookshelvesData={bookshelvesData}
              moveToShelf={this.moveToShelf}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              allShelfKeys={allShelfKeys}
              bookshelvesData={bookshelvesData}
              moveToShelf={this.moveToShelf}
              query={query}
              search={this.search}
              searchResultBooksData={searchResultBooksData}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
