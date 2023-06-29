import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

export default function Picking() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  const gltf = useGLTF("./books_with_magnifier.glb");
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableDamping={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <group>
        <primitive
          onClick={(event) => {
            console.log("gltf 모델 클릭");
            event.stopPropagation();
          }}
          object={gltf.scene}
          scale={10}
        />

        {/* <mesh
          onClick={(event) => {
            console.log("구 선택");
            // 구 뒤에 박스가 있으면 ray casting되어 stopPropagation으로 막아줘야 함
            event.stopPropagation();
          }}
          ref={sphereRef}
          position-x={-2}
        >
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" />
        </mesh> */}

        {/* <mesh
          onClick={(event) => {
            console.log("박스 선택");
            event.stopPropagation();
          }}
          onPointerEnter={(event) => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={(event) => {
            document.body.style.cursor = "default";
          }}
          ref={cubeRef}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="#F9E79F" />
        </mesh> */}

        <mesh
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
