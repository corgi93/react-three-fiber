import { useEffect } from "react";

const Timer = (props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("timer돌아가는 중");
    }, 1000);

    // 이 컴포넌트가 Unmount될 떄 호출될 함수임.
    return () => {
      console.log("goodbye");
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <span>Timer를 시작합니다</span>
    </div>
  );
};

export default Timer;
