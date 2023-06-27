import { OrbitControls, TransformControls } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Control() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  // leva는 라이브러리
  const { position, color, visible, interval } = useControls({
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
    interval: {
      min: -3,
      max: 3,
      value: [-2, 2],
    },
    clickMe: button(() => {
      alert("hi!");
    }),
    select: { options: ["CASE1", "CASE2", "CASE3"] },
  });

  // Leva의 Folder로 만들어 사용가능
  const { scale } = useControls("cube", {
    scale: {
      value: 1.6,
      step: 0.01,
      min: 0,
      max: 5,
    },
    color: "orange",
  });

  const { isTest } = useControls({
    isTest: true,
  });

  return (
    <>
      {isTest && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <group>
        <TransformControls object={sphereRef} />
        <mesh position-x={position.x} ref={sphereRef} visible={visible}>
          <sphereGeometry />
          <meshStandardMaterial color={color} />
        </mesh>

        <mesh ref={cubeRef} position-x={interval[1]} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="#F9E79E" />
        </mesh>

        <mesh
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshBasicMaterial color="#5D6D7E" />
        </mesh>
      </group>
    </>
  );
}
