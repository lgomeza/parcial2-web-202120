import React, { useEffect, useState } from 'react';
import {FormattedMessage} from 'react-intl';
import { Card } from '../components/Card';

export const Home = ({ searchKey }) => {
  const [products, setProducts] = useState([]);
  const originalServerUrl = 'http://localhost:3001/api/products';

  useEffect(() => {
    getProducts();
  }, [searchKey]);

  return (
    <section id='home'>
      <div className='home-container'>
        <h1><FormattedMessage id="gallery"/></h1>
        <div className='home-card'>
          {products.map((product) => 
            <Card
              key = {product._id}
              name = {product.name}
              picture = {product.picture}
              price = {product.price}
              isActive = {product.isActive === 'true'}
            />
          )}
        </div>
      </div>
    </section>
  );

  async function getProducts() {
    const url = originalServerUrl + (searchKey ? `?q=${searchKey}` : '');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setProducts(data);
    
  }
};
