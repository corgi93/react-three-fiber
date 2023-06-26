import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Counter from "./Counter";
import Timer from "./Timer";
import CounterRef from "./CounterRef";
import Memo from "./Memo";
import Memo2 from "./Memo2";

import Callback from "./Callback";
import Box from "./Box";
import ForwardRef from "./ForwardRef";

function Part(props) {
  return <li>{props.title}</li>;
}

function PartList(props) {
  const members = props.members;
  return (
    <>
      <ol>
        {members.map((item, idx) => (
          <Part key={idx} title={`Hi - ${item}`} />
        ))}
      </ol>
    </>
  );
}

function FancyBorder(props) {
  return (
    <>
      <div
        style={{
          border: `1px solid ${props.color}`,
          margin: "4px",
          padding: "10px",
          background: "#efefef",
        }}
      >
        {props.children}
      </div>
    </>
  );
}

function queryItemsFromDBMS() {
  console.log("dbms로부터 데이터 쿼리 중..."); // 비동기 처리
  return ["홍길동1", "일지매2"];
}

function App() {
  const members = ["길동", "영희", "철수a"];
  const [value, setValue] = useState("");
  // const [items, setItems] = useState(["길동", "철수"]);
  const [items, setItems] = useState(() => {
    return queryItemsFromDBMS();
  });
  const [showTimer, setShowTimer] = useState(true);

  const handleInputChange = (e) => {
    console.log("ee", e.target.value);
    setValue(e.target.value);
  };
  const handleAddClick = (e) => {
    // 직접 dom에서 찾아서 핻 된다. input을 위한 state를 만들고 싶지 않으면
    const value = document.querySelector("input").value;

    // setItems([...items, value]);
    setItems((prevItems) => {
      return [...prevItems, value];
    });
  };

  /**
   * useCallback
   */

  const [size, setSizes] = useState(100);
  const [isDark, setIsDark] = useState(true);

  // const createBoxStyle = () => {
  //   return {
  //     backgroundColor: "red",
  //     width: `${size}px`,
  //     height: `${size}px`,
  //   };
  // };

  // FIX: memoization으로 최적화.
  // 위에선isDark값이 바뀌면 createBoxStyle함수가 재정의..
  // useCallback과 size를 지정하고 size상태만 변경될 때만 createBoxStyle 재정의 하도록해서
  // size변경시만 렌더링되도록 최적화
  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: "red",
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);

  return (
    <>
      <FancyBorder color="black">
        <h1>welcom</h1>
        <p>thank you</p>
      </FancyBorder>
      <PartList members={members} />

      <input type="text" onChange={handleInputChange} />
      <button
        onClick={(e) => {
          handleAddClick(e);
        }}
      >
        이름 추가
      </button>
      {items.map((name, idx) => {
        return <p key={idx}>{name}</p>;
      })}

      <h2>coutner - useEffect..</h2>
      <Counter />

      <h2>timer - useEffect..</h2>
      <div>
        <button onClick={() => setShowTimer(!showTimer)}>타이머 ON/OFF</button>
        {showTimer && <Timer></Timer>}
      </div>

      <h2>useRef 실습</h2>
      <CounterRef />

      <Memo />

      <Memo2 />

      <Callback />

      <br />
      <div style={{ background: isDark ? "black" : "white" }}>
        <input
          type="number"
          value={size}
          onChange={(e) => setSizes(e.target.value)}
        />
        <Box createBoxStyle={createBoxStyle} />
        <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
      </div>

      <br />
      <ForwardRef />
    </>
  );
}

export default App;
