import { useState } from "react";
export default function AddChef(props) {
  const [file, setFile] = useState();
  const handleFile = (event) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementsByClassName("chefImage")[0].src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  return (
    <>
      <div
        className="modal fade"
        id="addChefModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Chef
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
                <label className="form-label">Chef Name</label>
                <input
                  id="chefName"
                  className="form-control"
                  placeholder="Enter Chef Name"
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Photo of Chef</label>
                <input
                  id="chefImage"
                  className="form-control"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFile}
                />
                {file && (
                  <div className="my-3 text-center">
                    <img
                      className="chefImage w-50 p-3 border border-2 border-warning rounded"
                      src=""
                      alt=""
                    />
                  </div>
                )}
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Chef Speciality</label>
                <textarea
                  id="chefSpeciality"
                  className="form-control"
                  placeholder="Enter Chef Speciality"
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">Chef Experience</label>
                <input
                  id="chefExperience"
                  className="form-control"
                  placeholder="Enter Chef Experience in Years"
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
                Add Chef
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
