import React, { useEffect, useState } from "react";
import httpRequest from "../../utils/request";
import ProductCard from "../cards/productCard";

const RestaurantProducts = ({ id }) => {
  const [products, SetProducts] = useState();

  useEffect(() => {
    httpRequest(`/api/products/${id}`, "GET").then((response) => {
      if (response.success) {
        SetProducts(response.data);
      }
    });
  }, []);

  if (!products) return <></>;

  return (
    <div className="container-fluid shadow w-auto my-4 mx-2 p-2 p-md-4 rounded">
      <h3 className="mb-3 mx-2 text-yellow">We Serve</h3>
      <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
      <div className="px-1 py-3 px-md-4">
        <div className="row">
          {products.map((product, index) => (
            <div
              key={`restaurant_page_products_card_${index}`}
              className="col-xs-12 col-sm-6 col-md-4 p-3"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProducts;
