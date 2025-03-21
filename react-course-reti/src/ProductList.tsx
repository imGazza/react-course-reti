import React, { ReactElement } from 'react';
import './ProductList.css';
import { Product } from './App';

//TODO: define required component intefae

const products: Product[] = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 0.5 },
  { id: 3, name: 'Orange', price: 0.8 }
];

interface ProductListProps{
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({addToCart}) => {
  return (
    <div className="product-list">
      <h2>Prodotti Disponibili</h2>
      <div className="product-items">
        <ul>
          {products.map((item, index) => (
            <li key={item.id}>{item.name}, {item.price}, <button onClick={() => addToCart(item)}>Add</button></li>
          ))}
        </ul>        
      </div>
    </div>
  );
};

export default ProductList;
