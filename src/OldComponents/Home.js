import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import Services from "./Services";

export default function Home(props) {
  useEffect(() => {
    props.userData && navigate("/dashboard");
  });
  const navigate = useNavigate();
  return (
    <>
      <Slider userData={props.userData} setData={props.setData} />
      <Services />
    </>
  );
}
