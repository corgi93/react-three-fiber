import { forwardRef } from "react";

function CustomInput(props, ref) {
  return <input ref={ref} />;
}

export default forwardRef(CustomInput)