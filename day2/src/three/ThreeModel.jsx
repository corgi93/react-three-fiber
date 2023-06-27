import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Model from "./Model";

export default function ThreeModel() {
  const model = useGLTF("./books_with_magnifier.glb");
  console.log("model:", model);

  return (
    <>
      <Perf position="top-left" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow shadow-normalBias={0.03} />
      <OrbitControls makeDefault />
      <group>
        {/* <primitive object={model.scene} scale={10}  /> */}
       <Model scale={12} />
      
        <mesh
          receiveShadow
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" />
        </mesh>
      </group>
    </>
  );
}
