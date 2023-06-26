import { useEffect, useMemo, useState } from "react";

export default function Memo2() {
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);
  // boolean이란 원시값 -  call by value로
  //   const location = isKorea ? "한국" : "외국";
//   const location = {
//     // 객체의 대한 비교는 주소값으로.. 메모리 주소 777 -> 789
//     country: isKorea ? "한국" : "외국",
//   };

  const location = useMemo(() => {
    return { country: isKorea ? "한국" : "외국" };
  }, [isKorea]);

  useEffect(() => {
    console.log("useEffect 호출!!");
  }, [location]);

  return (
    <div>
      <h2>예제2 - useMemo</h2>
      <h3>하루에 몇끼 먹어요?</h3>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <hr />
      <h3>어느 나라에 있어요?</h3>
      <p>나라: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
}
