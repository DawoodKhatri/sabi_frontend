import { useEffect } from "react";

export default function ItemCard(props) {
  const CSS = `
  .itemCard${props.item}:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 30%);
  }
  .itemSelected${props.item}
            {
              border: 3px solid;
              margin: 1px !important;
              border-color: var(--bs-warning) !important
            }`;
  const handleSelect = (event) => {
    if (props.type && props.type === "chef") {
      if (
        document
          .getElementsByClassName(`itemCard${props.item}`)
          [props.index].classList.contains(`itemSelected${props.item}`)
      ) {
        document
          .getElementsByClassName(`itemCard${props.item}`)
          [props.index].classList.remove(`itemSelected${props.item}`);
        props.setSelection([props.item, props.index], "removed");
      } else {
        if (
          document.getElementsByClassName(`itemSelected${props.item}`).length
        ) {
          document
            .getElementsByClassName(`itemSelected${props.item}`)[0]
            .classList.remove(`itemSelected${props.item}`);
        }
        document
          .getElementsByClassName(`itemCard${props.item}`)
          [props.index].classList.add(`itemSelected${props.item}`);
        props.setSelection([props.item, props.index]);
      }
    } else {
      if (
        document
          .getElementsByClassName("itemCard")
          [props.index].classList.contains("itemSelected")
      ) {
        document
          .getElementsByClassName("itemCard")
          [props.index].classList.remove("itemSelected");
        if (props.type === "dish") {
          props.setSelection("" + props.index);
        } else {
          props.setSelection();
        }
      } else {
        if (
          !props.multiple &&
          document.getElementsByClassName("itemSelected").length
        ) {
          document
            .getElementsByClassName("itemSelected")[0]
            .classList.remove("itemSelected");
        }
        document
          .getElementsByClassName("itemCard")
          [props.index].classList.add("itemSelected");
        props.setSelection(props.index);
      }
    }
  };
  return (
    <div
      className="col-12 col-sm-6 col-lg-4 p-2 text-center"
      onClick={handleSelect}
    >
      {props.type && props.type === "chef" && <style>{CSS}</style>}
      <div
        className={`itemCard${
          props.type && props.type === "chef" ? props.item : ""
        } h-100 m-1 rounded rounded-4 overflow-hidden`}
      >
        <img className="image w-100 h-75" src={props.image} alt="" />
        <p className="m-2 fs-5">{props.text}</p>
      </div>
    </div>
  );
}
