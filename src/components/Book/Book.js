import React, {useContext, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {UserContext} from '../../App';
import Grid from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import KeyboardDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';

import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import Bookings from '../Bookings/Bookings';

format(new Date(), "'Today is a' eeee")



const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckInDate = (date) => {
        const newDates = {...selectedDate};
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleCheckOutDate = (date) => {
        const newDates = {...selectedDate};
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate };
        fetch('http://localhost:4000/addBooking', { 
            method: 'POST',    
            headers: { ContentType: 'application/json' }, 
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then( data => {
            console.log(data);
        })
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello , {loggedInUser.name }Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        label="CheckIn Date"
                        inputFormat="MM/dd/yyyy"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <KeyboardDatePicker
                        label="CheckOut Date"
                        inputFormat="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Button variant="contained" onclick={handleBooking()}>Book Now</Button>
            </LocalizationProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;