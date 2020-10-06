import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartList = (props) => {
    const { name, img, id } = props.cart;
    return (
        <div className="container" >
            <div style={{ marginTop: "40px" }} >
                <Card style={{ float: 'left', width: '22%', margin: '10px' }}>
                    <Card.Img variant="top" src={img} />

                    <Card.Body>
                        <Card.Title> {name} </Card.Title>
                        <Link to={`/registerPage/${id}`} >
                            <Button variant="primary">Register Now</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default CartList;