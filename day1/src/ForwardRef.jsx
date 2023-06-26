import React, { useRef } from "react";
import CustomInput from "./CustomInput";

/**
 * 부모 컴포넌트에서 자식 컴포넌트 내부의 무언가를 useRef로 참조하고자 할때 사용
 */

export default function ForwardRef() {
  const refInput = useRef();

  return (
    <div>
      {/* 자식 컴포넌트인 CustomInput을 참조 */}
      <CustomInput ref={refInput} />
      <button
        onClick={() => {
          refInput.current.focus();
        }}
      >
        focus
      </button>
    </div>
  );
}
