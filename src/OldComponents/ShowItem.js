export default function ShowChef(props) {
  return (
    <>
      <div
        className="modal fade"
        id="showItemModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.setCurr}
              ></button>
            </div>
            <div className="modal-body text-center">
              <div className="my-3 text-center">
                <img
                  className="w-50 h-auto rounded rounded-2 shadow"
                  src={props.image}
                  alt=""
                />
              </div>
              <div className="mb-3 text-center">
                <h3>{props.name}</h3>
              </div>
              {props.description.map((fields) => {
                return (
                  <div className="mb-3 fs-5">
                    <hr />
                    {Array.from(fields).map((data) => {
                      return <p>{data}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
