import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ChefCard, ProductCard } from "../index";
import { useState } from "react";
import httpRequest from "../../utils/request";
import { Draggable, Droppable } from "react-drag-and-drop";
import noData from "../../assets/images/no_data.png";

const BookingChefSelection = ({ orders, setOrders }) => {
  const [chefs, setChefs] = useState([]);
  const { restaurant, products } = useSelector((state) => state.cart);

  useEffect(() => {
    restaurant &&
      httpRequest(`/api/chefs`, "GET").then((response) => {
        if (response.success) {
          setChefs(response.data);
        }
      });
  }, [restaurant]);

  const selectChef = (chefId) => {
    setOrders([
      ...orders,
      {
        chef: chefId,
        products: [],
      },
    ]);
  };

  const unSelectChef = (index) => {
    const tempOrders = Array.from(orders);
    tempOrders.splice(index, 1);
    setOrders(tempOrders);
  };

  const addProduct = (index, productId) => {
    const tempOrders = Array.from(orders);

    for (let order in tempOrders) {
      if (tempOrders[order].products.includes(productId)) {
        tempOrders[order].products.splice(
          tempOrders[order].products.indexOf(productId),
          1
        );
      }
    }

    tempOrders[index]["products"].push(productId);
    setOrders(tempOrders);
  };

  const removeProduct = (productId) => {
    const tempOrders = Array.from(orders);

    for (let order in tempOrders) {
      if (tempOrders[order].products.includes(productId)) {
        tempOrders[order].products.splice(
          tempOrders[order].products.indexOf(productId),
          1
        );
      }
    }

    setOrders(tempOrders);
  };

  if (!chefs.length) return <></>;

  return (
    <div className="row">
      <div className="col-3">
        <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 rounded">
          <div className="d-flex justify-content-between align-items-center mx-2">
            <h2 className="text-yellow">All Products</h2>
          </div>
          <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>

          <Droppable
            types={["product"]}
            onDrop={({ product }) => {
              removeProduct(product);
            }}
          >
            {products.filter(
              ({ product }, index) =>
                orders.filter(({ products: orderProducts }) =>
                  orderProducts.includes(product._id)
                ).length === 0
            ).length > 0 ? (
              <div className="px-1 py-3 px-md-4">
                {products.map(
                  ({ product }, index) =>
                    orders.filter(({ products: orderProducts }) =>
                      orderProducts.includes(product._id)
                    ).length === 0 && (
                      <div
                        key={`booking_page_all_products_card_${index}`}
                        className="py-3"
                      >
                        <Draggable type="product" data={product._id}>
                          <ProductCard {...product} disabled />
                        </Draggable>
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="my-5 text-center">
                <img src={noData} width={150} />
                <p className="text-purple fw-bold fs-3 my-1">
                  No more Products
                </p>
                <p className="text-yellow fw-semibold">
                  Chefs Assigned to All Products
                </p>
              </div>
            )}
          </Droppable>
        </div>
      </div>
      <div className="col-9">
        {orders.map(
          ({ chef: orderChef, products: orderProducts }, orderIndex) => (
            <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 mb-4 rounded">
              <div className="d-flex justify-content-between align-items-center mx-2">
                <h2 className="text-yellow">Add Products</h2>
                <button
                  className="btn btn-yellow h-auto my-2"
                  onClick={() => {
                    unSelectChef(orderIndex);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>

              <div className="row ">
                <div className="col-9 px-1 py-3 px-md-4">
                  <Droppable
                    types={["product"]}
                    className="d-flex flex-column h-100"
                    onDrop={({ product }) => {
                      addProduct(orderIndex, product);
                    }}
                  >
                    {orderProducts.length > 0 ? (
                      <div className="row h-100 align-content-center">
                        {orderProducts.map((orderProduct, index) => (
                          <div
                            key={`booking_page_order_${orderIndex}_products_card_${index}`}
                            className="col-12 col-md-6 col-lg-4 px-2 py-3"
                          >
                            <Draggable
                              type="product"
                              data={
                                products.filter(
                                  ({ product: { _id } }) => orderProduct === _id
                                )[0].product._id
                              }
                            >
                              <ProductCard
                                {...products.filter(
                                  ({ product: { _id } }) => orderProduct === _id
                                )[0].product}
                                disabled
                              />
                            </Draggable>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="m-auto text-center">
                        <img src={noData} width={150} />
                        <p className="text-purple fw-bold fs-3 my-1">
                          No Products Added
                        </p>
                        <p className="text-yellow fw-semibold">
                          Drag and Drop Items here to Add
                        </p>
                      </div>
                    )}
                  </Droppable>
                </div>
                <div className="col-3 my-auto text-center">
                  <div className="border-start border-purple my-4">
                    <ChefCard
                      {...chefs.filter(({ _id }) => orderChef === _id)[0]}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {orders.length !== chefs.length && (
          <div className="container-fluid bg-white text-center row justify-content-center align-items-center shadow w-auto p-2 m-0 rounded">
            {/* <div className="d-flex justify-content-between align-items-center mx-2">
              <h2 className="text-yellow">
                {orders.length > 0 ? <>Select More Chefs</> : <>Select Chef</>}
              </h2>
            </div>
            <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div> */}

            <h2 className="col-2 text-yellow text-center">
              {orders.length > 0 ? (
                <>
                  Select<br/>More
                  <br />
                  Chefs
                </>
              ) : (
                <>Select<br/>Chef</>
              )}
            </h2>
            <div
              className="col-10 row flex-row flex-nowrap"
              style={{ overflowX: "auto", overflowY: "hidden" }}
            >
              {chefs.map(
                (chef, chefIndex) =>
                  orders.filter(({ chef: orderChef }) => orderChef === chef._id)
                    .length === 0 && (
                    <div
                      key={`booking_page_chefs_card_${chefIndex}`}
                      className="col-6 col-sm-6 col-md-4 col-lg-3 p-3"
                      onClick={() => {
                        selectChef(chef._id);
                      }}
                    >
                      <ChefCard {...chef} disabled />
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingChefSelection;
