import { useState } from "react";
import "./App.css";

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
  console.log('dbms로부터 데이터 쿼리 중...') // 비동기 처리
  return ['홍길동1' , '일지매2']
}

function App() {
  const members = ["길동", "영희", "철수a"];
  const [value, setValue] = useState("");
  // const [items, setItems] = useState(["길동", "철수"]);
  const [items, setItems] = useState(() => {return queryItemsFromDBMS()});

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
    </>
  );
}

export default App;
