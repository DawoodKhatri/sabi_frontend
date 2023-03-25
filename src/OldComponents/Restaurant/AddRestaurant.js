import { useState } from "react";
export default function AddRestaurant(props) {
  const [State, setState] = useState("Initial");
  const [file, setFile] = useState();
  var api = process.env.REACT_APP_SERVER;
  // var api = "http://localhost:4040";
  const handleFile = (event) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementsByClassName("dishImage")[0].src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  const updateDetails = () => {
    const query = `/?uid=${props.userData.id}&name=${
      document.getElementById("restoName").value
    }&images=${document.getElementById("restoImages").files}&speciality=${
      document.getElementById("restoSpecialities").value
    }&address:${document.getElementById("restoAddress").value}`;
  };
  return (
    <>
      <div
        className="modal fade"
        id="addRestaurantModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Restaurant Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Restaurant Name</label>
                <input
                  id="restoName"
                  className="form-control"
                  placeholder="Enter Restaurant Name"
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Images of Restaurant</label>
                <input
                  id="restoImages"
                  className="form-control"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFile}
                  multiple
                />
                {file && (
                  <div className="my-3 text-center">
                    <img
                      className="restoImages w-50 p-3 border border-2 border-warning rounded"
                      src=""
                      alt=""
                    />
                  </div>
                )}
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Restaurant Specialities</label>
                <input
                  id="restoSpecialities"
                  className="form-control"
                  placeholder="Enter Restaurant Specialities"
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Restaurant Address</label>
                <textarea
                  id="restoAddress"
                  className="form-control"
                  placeholder="Enter Restaurant Address"
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Restaurant Contact</label>
                <input
                  id="restoContact"
                  className="form-control"
                  placeholder="Enter Restaurant Contact Number"
                />
                <div className="invalid-feedback"></div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-warning">
                Update Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
