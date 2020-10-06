import React, { useContext, useState } from 'react';
import './RegisterPage.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import fakeData from '../../fakeData';
import { Link, useParams } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from 'react-bootstrap';

const RegisterPage = (props) => {

    const { volunteerId } = useParams();
    const selectedVolunteer = fakeData.find(volunteer => volunteer.id === volunteerId);
    console.log(selectedVolunteer);

    const { name, id } = selectedVolunteer;

    const { register, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date(),
    });

    const handleCheckInDate = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleCheckOutDate = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };


    const handleRegister = () => {
        const newRegister = { ...loggedInUser, ...selectedDate };
        fetch('http://localhost:5000/addRegister', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRegister),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }


    return (

        <div className="container">
            <h1> Register as a {name} volunteer </h1>


            <form className="reg-form" >


                <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <span className="error">Name is required</span>}

                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
                {errors.email && <span className="error">Email is required</span>}


                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="CheckIn Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="CheckOut Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </MuiPickersUtilsProvider>


                <input name="Description" ref={register({ required: true })} placeholder="Description" />
                {errors.address && <span className="error">description is required</span>}

                <input name="address" ref={register({ required: true })} placeholder="Your Address" />
                {errors.address && <span className="error">Address is required</span>}

                <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
                {errors.phone && <span className="error">Phone Number is required</span>}

                <input name="name" defaultValue={name} ref={register({ required: true })} placeholder="Your volunteer Name" />

            </form>

            <Link to="/finalPage" >
                <Button onClick={handleRegister} variant="contained" className="btn btn-primary">Register
            </Button>
            </Link>


        </div>


    );
};

export default RegisterPage;