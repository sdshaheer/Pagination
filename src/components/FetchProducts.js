import React from 'react';
import { useState, useEffect } from 'react';
import classes from './fetchProducts.module.css';

const FetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    console.log(data, page);
    if (data?.products) {
      setProducts(data.products);
    }
  };

  const handlePage = (i) => {
    setPage(i);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className={classes.container}>
      <div className={classes.products}>
        {products.length > 0 &&
          products.map((product) => {
            return (
              <div className={classes.product}>
                <img
                  className={classes.image}
                  src={product.thumbnail}
                  alt={product.title}
                />
                <span className={classes.price}> Price : {product.price}</span>
              </div>
            );
          })}
      </div>
      {products.length > 0 && (
        <div className={classes.footer}>
          {page > 1 && <span onClick={handlePrev}>{'<<'}</span>}
          {[...Array(10)].map((_, i) => {
            return (
              <span onClick={() => handlePage(i + 1)} key={i + 1}>
                {i + 1}
              </span>
            );
          })}
          {page < 10 && <span onClick={handleNext}>{'>>'}</span>}
        </div>
      )}
    </div>
  );
};

export default FetchProducts;
