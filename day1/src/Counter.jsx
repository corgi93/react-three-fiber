import React, { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");
  const handleCountUpdate = () => {
    setCount(count + 1);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // 렌더링될때마다 useEffect의 콜백함수가 실행됨
  useEffect(() => {
    console.log("렌더링");
  });

  // 마운팅(처음 렌더링)될때만 useEffect의 콜백함수가 호출됨
  useEffect(() => {
    console.log("Mount!");
  }, []);

  // 마운팅 + count 상태값이 변경될 때마다 useEffect의 콜백함수가 호출됨
  useEffect(() => {
    console.log("count 변경");
  }, [count]);

  // 마운팅 + text 상태값이 변경될 때마다 useEffect의 콜백함수가 호출됨
  useEffect(() => {
    console.log("text 변경");
  }, [text]);

  return (
    <div>
      <button onClick={handleCountUpdate}>Update</button>
      <div>Count: {count}</div>
      <input type="text" onChange={handleInputChange} />
      <div>Input Value: {text}</div>
    </div>
  );
}
