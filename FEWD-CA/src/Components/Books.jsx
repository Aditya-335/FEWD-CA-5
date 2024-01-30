import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../Components/Books.css';

// Functional component to fetch books from an API and display them
function API() {
  // State to store the fetched books and search query
  const [books, setBooks] = useState([]); // State variable for books
  const [searchQuery, setSearchQuery] = useState(''); // State variable for search query

  // Fetch books from the API when the component mounts
  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { Authorization: "whatever-you-want" }, // Authorization header
    })
    .then((response) => {
      const data = response.data.books; // Extracting book data from response
      setBooks(data); // Updating books state with fetched data
    })
    .catch(() => {
      console.log("Status code: 404"); // Log error if API endpoint not found
      console.log("Website not found");
    });
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  // Event handler to update search query state as user types in search input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Updating search query state with user input
  };

  // Filtering books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Rendering component JSX
  return (
    <div>
      {/* Navigation bar */}
      <nav>
        <div className='head'>
          <div className='name'>
            <h1>Kalvium Books</h1> {/* Title */}
          </div>
          <div className='search-btn'>
            <input 
              type='text' 
              className='search' 
              placeholder='Search your Books' // Placeholder text for search input
              value={searchQuery} // Binding search query state to input value
              onChange={handleSearchInputChange} // Event handler for input change
            />

          </div>
          {/* Register button with Link to registration page */}
          <Link to='/reg'><button className='Btn'>Register</button></Link>
        </div>
      </nav>
      {/* Displaying filtered books */}
      <div className='cont'>
        {filteredBooks.map((book) => (
          <div key={book.id} className='key'>
            <div className="container">
              <div className="image">
                <img src={book.imageLinks.smallThumbnail} alt={book.title} /> {/* Book image */}
                <h3>{book.title}</h3> {/* Book title */}
                <h4>Free</h4> {/* Indicating book is free */}
                <h5>{book.averageRating||4}⭐</h5> {/* Book rating */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default API; // Exporting API component
