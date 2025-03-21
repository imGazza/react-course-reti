import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import Cart from './Cart';

//TODO: define Product type here
export interface Product{
  id: number;
  name: string;
  price: number;
}

const App: React.FC = () => {
  //TODO: handle state 
  const [cart, setCart] = useState<Product[]>([]);

  //TODO: handle add cart method
  function addToCart(product: Product){
    setCart((prevItems) => [...prevItems, product]);
  }  

  return (
    <div className="app-container">
      <h1>Shopping Cart</h1>
      <ProductList addToCart={addToCart}/>
      <Cart cart={cart}></Cart>
    </div>
  );
};

export default App;

