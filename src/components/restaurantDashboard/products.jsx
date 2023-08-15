import React, { useEffect, useState } from "react";
import httpRequest from "../../utils/request";
import { useParams } from "react-router-dom";
import ProductCard from "../cards/productCard";
import emptyImage from "../../assets/images/no_data.png";

const RestaurantDashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    httpRequest(`/api/products/${id}`, "GET").then((response) => {
      if (response.success) {
        setProducts(response.data);
      }
    });
  }, [change]);
  return (
    <div>
      <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 m-4 rounded">
        {products.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center mx-2">
              <h2 className="text-yellow">My Products</h2>
            </div>
            <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
            <div className="my-4 row">
              {products.map((product, index) => (
                <div
                  key={`restaurant_dashboard_products_card_${index}`}
                  className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-3"
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="m-auto my-5 text-center">
              <img src={emptyImage} width={250} />
              <p className="fs-3 fw-semibold text-purple mt-3">
                No Products Added
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboardProducts;
