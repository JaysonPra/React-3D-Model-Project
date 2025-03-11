import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Counter2 = () => {
  let counterStore = useSelector((store) => store.counterStore);
  let count = counterStore.count;

  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center h-[90vh] text-2xl flex-col">
      Count: {count}
      <div>
        <button
          className="add-btn text-white"
          onClick={() => {
            dispatch({ type: "INCREASE" });
          }}
        >
          INCREASE COUNT
        </button>
      </div>
      <button
        className="add-btn text-white"
        onClick={() => {
          dispatch({ type: "DECREASE" });
        }}
      >
        DECREASE COUNT
      </button>
      <button
        className="add-btn text-white"
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default Counter2;
