import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/Books.css';

function API() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { Authorization: "whatever-you-want" },
    })
    .then((response) => {
      const data = response.data.books;
      setBooks(data);
    })
    .catch(() => {
      console.log("Status code: 404");
      console.log("Website not found");
    });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <nav>
        <div className='head'>
          <div className='name'>
            <h1>Kalvium Books</h1>
          </div>
          <div className='search-btn'>
            <input 
              type='text' 
              className='search' 
              placeholder='Search your Books'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button className='Btn'>Search</button>
          </div>
        </div>
      </nav>
      <div className='cont'>
        {filteredBooks.map((book) => (
          <div key={book.id} className='key'>
            <div className="container">
              <div className="image">
                <img src={book.imageLinks.smallThumbnail} alt={book.title} />
                <h3>{book.title}</h3>
                <h4>Free</h4>
                <h5>{book.averageRating}⭐</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default API;
