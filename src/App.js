
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './Login';
import Books from './Books';
import EditBookForm from './EditBookForm';
import BooksPage from './BooksPage'; 
import axios from 'axios';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:7000/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBooks(response.data);
      setFilteredBooks(response.data); 
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  const handleLogin = () => {
    console.log('Login successful');
    setIsAuthenticated(true);
  };

  const handleSearch = () => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
    setFilteredBooks([...books, newBook]); 
  };

  const handleEditBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks); 
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:7000/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Failed to delete book.');
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/books" element={<BooksPage />} />

          <Route path="/" element={
            <>
              
              {!isAuthenticated && <Login onLogin={handleLogin} />}
              
              {isAuthenticated && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Search by title"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                  </div>

                  <Books
                    books={filteredBooks}
                    isAuthenticated={isAuthenticated}
                    onDelete={handleDeleteBook}
                  />

                  <div>
                    <h3>Edit Books</h3>
                    <EditBookForm
                      onAdd={handleAddBook}
                      onEdit={handleEditBook}
                    />
                  </div>
                </>
              )}

              {error && <div>{error}</div>}
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
