import React, { useState } from 'react';
import fakeData from '../../fakeData';
import CartList from '../CartList/CartList';
import './Home.css';

const Home = () => {
    const volunteerInfo = fakeData;
    const [cart, setCart] = useState(volunteerInfo);

    return (
        <div className="container">
            <div>
                <h1 className="home-title">I Grow by helping people in need</h1>
                <input className="form-control" type="text" placeholder="Search..." />
                <button className="btn btn-primary">Search</button>
            </div>
            <div>
                {
                    cart.map(cart => <CartList cart={cart} ></CartList>)
                }
            </div>

        </div>
    );
};

export default Home;