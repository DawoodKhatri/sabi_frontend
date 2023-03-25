import { useState } from "react";
export default function AddDish(props) {
  const [file, setFile] = useState();
  const handleFile = (event) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementsByClassName("dishImage")[0].src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  return (
    <>
      <div
        className="modal fade"
        id="addDishModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Dish
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
                <label className="form-label">Dish Name</label>
                <input
                  id="dishName"
                  className="form-control"
                  placeholder="Enter Restaurant Name"
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Image of Dish</label>
                <input
                  id="dishImage"
                  className="form-control"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFile}
                />
                {file && (
                  <div className="my-3 text-center">
                    <img
                      className="dishImage w-50 p-3 border border-2 border-warning rounded"
                      src=""
                      alt=""
                    />
                  </div>
                )}
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Dish Description</label>
                <textarea
                  id="dishDescription"
                  className="form-control"
                  placeholder="Enter Dish Description"
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Dish Price</label>
                <input
                  id="dishPrice"
                  className="form-control"
                  placeholder="Enter Dish Price"
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
                Add Dish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
