import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const EditBookForm = ({ onAdd, onEdit, bookToEdit }) => {
  const [book, setBook] = useState({
    id: null,
    title: '',
    author: '',
    description: '',
    publicationDate: '',
    coverImage: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setBook(bookToEdit);
    } else {
      setBook({
        id: null,
        title: '',
        author: '',
        description: '',
        publicationDate: '',
        coverImage: '',
      });
    }
  }, [bookToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!book.title || !book.author) {
      setError('Title and Author are required');
      return;
    }

    try {
      if (book.id) {
        const response = await axios.put(`http://localhost:7000/books/${book.id}`, book, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        onEdit(response.data); 
      } else {
    
        const response = await axios.post('http://localhost:7000/books', book, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        onAdd(response.data);
      }
      setError(''); 
    } catch (error) {
      setError(book.id ? 'Failed to edit book.' : 'Failed to add book.');
    }

    setBook({
      id: null,
      title: '',
      author: '',
      description: '',
      publicationDate: '',
      coverImage: '',
    });
  };

  return (
    <div>
      <h3>{book.id ? 'Edit' : 'Add'} Book</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          placeholder="Author"
          required
        />
        <textarea
          value={book.description}
          onChange={(e) => setBook({ ...book, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="date"
          value={book.publicationDate}
          onChange={(e) => setBook({ ...book, publicationDate: e.target.value })}
        />
        <input
          type="text"
          value={book.coverImage}
          onChange={(e) => setBook({ ...book, coverImage: e.target.value })}
          placeholder="Cover Image URL"
        />
        <button type="submit">{book.id ? 'Save Changes' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default EditBookForm;
