import React, { useState, useEffect } from "react";
import "../all.css";
import Axios from "axios";

function SearchProduct() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "http://localhost:8080/api/QueryProductById/1"
    );

    let parseData = JSON.parse(data.response);

    setProducts(parseData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Area</th>
            <th>Owner Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <th>{product.id}</th>
              <th>{product.name}</th>
              <th>{product.area}</th>
              <th>{product.ownerName}</th>
              <th>{product.cost}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchProduct;
