export function formatBooksData(books) {
  return books.map((book) => {
    const { authors, id, imageLinks, title } = book;
    const imageUrl = imageLinks ? imageLinks.thumbnail : '';

    return {
      authors: authors || ['unknown'],
      id,
      imageUrl,
      title,
    };
  });
}

export function generateShelves(books) {
  const shelves = [];

  books.forEach((book) => {
    if (!shelves.includes(book.shelf)) {
      shelves.push(book.shelf);
    }
  });

  return shelves;
}

export function generateBookshelvesData(shelves, books) {
  const bookshelvesData = {};

  shelves.forEach((shelfName) => {
    const bookIdsOnShelf = books
      .filter((book) => book.shelf === shelfName)
      .map((book) => book.id);

    bookshelvesData[shelfName] = bookIdsOnShelf;
  });

  return bookshelvesData;
}
