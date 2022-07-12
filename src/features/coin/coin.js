import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment,decrement } from "../counter/counterSlice";

function Coin() {
  const count = useSelector((state) => state.value);
  // console.log(33, count);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Coin;
