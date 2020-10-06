import React, { useContext, useEffect, useState } from 'react'; import { UserContext } from '../../App';
;

const FinalPage = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [register, setRegister] = useState([])


    useEffect(() => {
        fetch('http://localhost:5000/registerUser?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => setRegister(data))
    }, [])

    return (
        <div>
            <h3> You Have : {register.length} register </h3>

            {
                register.map(register => <li > {register.name} from: {new Date(register.checkIn).toDateString('dd/MM/yyyy')} to: {new Date(register.checkOut).toDateString('dd/MM/yyyy')} </li>)
            }

        </div>
    );
};

export default FinalPage;