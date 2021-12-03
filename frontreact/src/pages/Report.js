import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Chart } from '../components/Chart';

export const Report = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section id='report'>
      <div className='report-container'>
        <h1><FormattedMessage id="inventoryUnits"/></h1>
        <Chart
          data = {products}
        />
      </div>
    </section>
  );

  async function getProducts() {
    const url = 'http://localhost:3001/api/products';
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
