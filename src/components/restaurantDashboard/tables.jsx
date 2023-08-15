import React, { useEffect, useState } from "react";
import httpRequest from "../../utils/request";
import { useParams } from "react-router-dom";
import TableCard from "../cards/tableCard";
import emptyImage from "../../assets/images/no_data.png";

const RestaurantDashboardTables = () => {
  const [tables, setTables] = useState([]);
  const [change, setChange] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    httpRequest(`/api/tables/${id}`, "GET").then((response) => {
      if (response.success) {
        setTables(response.data);
      }
    });
  }, [change]);
  return (
    <div>
      <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 m-4 rounded">
        {tables.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center mx-2">
              <h2 className="text-yellow">My Tables</h2>
            </div>
            <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
            <div className="my-4 row">
              {tables.map((table, index) => (
                <div
                  key={`restaurant_dashboard_tables_card_${index}`}
                  className="col-xs-6 col-sm-4 col-md-3 col-lg-2 p-3"
                >
                  <TableCard {...table}  role="restaurant"/>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="m-auto my-5 text-center">
              <img src={emptyImage} width={250} />
              <p className="fs-3 fw-semibold text-purple mt-3">
                No Tables Added
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboardTables;
