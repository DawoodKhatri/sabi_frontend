import image from "../../images/food2.jpg";
export default function Background() {
  return (
    <>
      <div className="about1 w-100">
        <div className="background w-100">
          <img src={image} className="w-100" alt="" />
        </div>
        <div className="foreground w-100 h-100">
          <div className="fg-text text-warning">
            <p className="t1 m-0 p-0">Welcome to SABI</p>
            <p className="t2 m-0 p-0">Order Now, Eat Later</p>
          </div>
        </div>
      </div>
    </>
  );
}
