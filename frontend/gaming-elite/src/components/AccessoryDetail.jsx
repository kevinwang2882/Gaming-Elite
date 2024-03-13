import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from "axios";

import { useCart } from '../CartContext';

export default function AccessoryDetail ({ user_id }) {
    const { addToCart } = useCart();
    let { id } = useParams()
    const [accessories, setAccessories] = useState('')


    useEffect(() => {
        const getAccessories = async () => {
            const response = await axios.get(`http://localhost:3001/accessories/${id}`)
            setAccessories(response.data)
        }
        getAccessories()

    }, [id])


    const handleAddToCart = () => {
        const newItem = { id: accessories._id, img: accessories?.img_path, name: accessories.name, price: accessories.price };
        addToCart(newItem);
        alert(`${accessories.name} x1 added to cart`);
      };


    return(
        <div className="accessories-details-page">
            <div className="promo-container">
                <h4 className="promo-text">Save 10% When You Buy $250+ In Store or Online</h4>
            </div>
            <div className="accessories-details-container">
                <div className="accessories-top-container">
                    <div className="accessories-image-container">
                        <img className='accessories-image' src={accessories.img_path} alt="" />
                    </div>
                    <div className="details-section">
                        <h2 className="accessories-type"> {accessories.type}</h2>
                        <h2 className="accessories-name">{accessories.name}</h2>
                        <h2 className="accessories-price"> ${accessories.price}</h2>

                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
