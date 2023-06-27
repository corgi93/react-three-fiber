import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./three/Experience";
import Control from "./three/Control";
import Shadow from "./three/Shadow";
import AccumulativeComp from "./three/AccumulativeComp";
import Background from "./three/Background";
import ThreeModel from "./three/ThreeModel";
import Groot from "./three/Groot";

function App() {
  // 배경색 설정하는 법 gl에서 세팅
  const onCreated = (state) => {
    const gl = state.gl;
    gl.setClearColor("#efefef", 1);
  };

  return (
    //  shadows를 false하여 threejs의 그림자 시스템을 사용하지 않을 수 있음
    <Canvas shadows dpr={[1, 2]} onCreated={onCreated}>
      {/* <Experience /> */}

      {/* <Control /> */}

      {/* <Shadow /> */}

      {/* <AccumulativeComp /> */}

      {/* <color args={["ivory"]} attach={"background"} /> */}
      {/* <Background /> */}

      {/* <ThreeModel /> */}
      <Groot scale={2} position-y={-0.8} />
    </Canvas>
  );
}

export default App;
