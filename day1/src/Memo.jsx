import React, { useMemo, useState } from "react";

function calculate(number) {
  console.log("어려운 계산 시작");

  let result = 0;
  for (let i = 0; i < 9999999; i++) {
    result += Math.sin(i + number);
  }

  console.log("어려운 계산 완료", result);

  return result;
}

export default function Memo() {
  const [inputValue, setInputValue] = useState(1);
//   const calValue =  calculate(inputValue);
  const calValue = useMemo(() => {
    // inputValue를 지정해 inputValue 상태가 변경될 때만 calculate()호출
    return calculate(inputValue);
  },[inputValue]);
  
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>어려운 계산 - useMemo</h2>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(parseInt(e.target.value))}
      />

      <div>결과 : {calValue} </div>
      <button onClick={handleCount}>증가: {count} </button>
    </div>
  );
}
