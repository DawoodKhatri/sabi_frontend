export default function Steps(props) {
  return (
    <>
      <div className="container py-3" style={{ width: "17rem" }}>
        <img className="w-25 m-3" src={props.image} alt="" />
        <h5 className="card-title text-danger m-2">{props.title}</h5>
        <p className="card-text m-2">{props.text}</p>
      </div>
    </>
  );
}
