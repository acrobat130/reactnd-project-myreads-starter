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
        /*
          TODO: "When you enter 'andk' quickly in the search bar you can check in networks bar of dev-tools that there are two requests sent to the server.
          One for 'and' and other for 'andk'.
          The response of 'and' is delayed and 'andk' gets resolved before.
          And because of the asynchronous nature of Promises the setState for 'and' is called after processing the response of 'andk' showing results of 'and' for 'andk'.
          Inside 'then' part of the promise check if(query === this.state.query) to ensure you are not going to replace the contents to an old response.
        */
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

    // TODO: put routes inside switch statement
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
