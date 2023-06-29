import { Canvas } from "@react-three/fiber";
import "./App.css";
import Space from "./Space";
import { KeyboardControls, Loader } from "@react-three/drei";
import { City } from "./City";
function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "run", keys: ["Shift"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas shadows>
        <Space />
        {/* <City /> */}
      </Canvas>
      <Loader />
    </KeyboardControls>
  );
}
export default App;
