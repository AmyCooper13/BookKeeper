import React from 'react';
import './App.css';

const Books = ({ books, isAuthenticated, onDelete, onEdit }) => {
  if (!books || books.length === 0) {
    return <div>No books available.</div>;
  }

  return (
    <div className="Books">
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Publication Date:</strong> {book.publicationDate}</p>
            <img src={book.coverImage} alt={book.title} width="100" />
            
            {isAuthenticated && (
              <>
                <button onClick={() => onDelete(book.id)}>Delete</button>
                <button onClick={() => onEdit(book)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
