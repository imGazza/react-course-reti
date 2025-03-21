import React from 'react';
import './Cart.css';
import { Product } from './App';

//TODO: define required component inteface
interface CartProps{
  cart: Product[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  //TODO: calculate cart total
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="cart-container">
      <h2>Il tuo Carrello</h2>
      <ul className="cart-items">
          {cart.map((item, index) => (
            <li key={index}>{item.name}, {item.price}</li>
          ))}
      </ul>
      <h3 className="total-price">{total}</h3>
    </div>
  );
};

export default Cart;
