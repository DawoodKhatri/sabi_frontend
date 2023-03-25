import image from "../../images/food3.jpg";
export default function Intro() {
  return (
    <>
      <div className="about1 w-100 h-50 mb-4">
        <div className="background w-100 h-50">
          <img src={image} className="w-100 h-100" alt="" />
        </div>
        <div className="foreground w-100 h-100">
          <div className="fg-text d-flex flex-column text-warning h-100">
            <p className="t1 p-0 m-0 mt-auto">Welcome to SABI</p>
            <p className="t2 p-0 m-0 mb-auto">Order Now, Eat Later</p>
          </div>
        </div>
      </div>
    </>
  );
}
