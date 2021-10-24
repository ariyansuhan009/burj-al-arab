import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../App'
const Bookings = () => {
     const [bookings, setBookings] = useState([]);
     const [loggedInUser, setLoggedInUser] = useContext(UserContext);

     useEffect(() => {
          fetch('http://localhost:4000/bookings?email='+loggedInUser.email, {
               method: 'GET',
               headers: {
                    authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    contentType: 'application/json'
               }
          })
          .then( res => res.json())
          .then( data => setBookings(data));

     }, [])
     return (
          <div>
               <h3>You Have : {bookings.length} bookings</h3>
               {
                    bookings.map(
                         book => 
                         <li>
                              {book.name} 
                              from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} 
                              to: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>
                    )
               }
          </div>
     );
};

export default Bookings;