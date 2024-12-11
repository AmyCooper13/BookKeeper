
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:7000/books');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books');
      }
    };
    
    fetchBooks();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (books.length === 0) {
    return <div>No books available.</div>;
  }

  return (
    <div className="BooksPage">
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Publication Date:</strong> {book.publicationDate}</p>
            <img src={book.coverImage} alt={book.title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
