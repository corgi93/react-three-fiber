import React, { useRef, useState } from "react";

export default function CounterRef() {
  console.log("CounterRef 컴포넌트 렌더링..");
  let value = 0;
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const inputRef = useRef();

  const increseCount = () => {
    setCount(count + 1);
  };

  const increseRefCount = () => {
    countRef.current += 1;
  };

  const increseLocalCount = () => {
    value += 1;
    console.log("value::", value);
  };

  const [_, render] = useState();

  const login = () => {
    alert(`환영합니다. ${inputRef.current.value}님!`);
    inputRef.current.focus(); // input객체의 focus()로 참조할 수 있다.
  };

  return (
    <div>
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <p>value: {value}</p>
      increseLocalCount
      <button onClick={increseCount}>값 증가</button>
      <button onClick={increseRefCount}>Ref값 증가</button>
      <button onClick={increseLocalCount}>value 증가</button>
      <button onClick={render}>렌더링</button>

      <input ref={inputRef} type="text" placeholder="username"></input>
      <button onClick={login}>로그인</button>
    </div>
  );
}
