import {
  AccumulativeShadows,
  ContactShadows,
  OrbitControls,
  RandomizedLight,
  Stats,
  useHelper,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";

export default function AccumulativeComp() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  const { ...args } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;

    // 애니메이션에 따라 동적으로 그림자가 따라가는걸 확인하기 위해 애니메이션 추가
    const time = state.clock.elapsedTime;
    cubeRef.current.position.x = 2 + Math.sin(time);
  });
  
  return (
    <>
      <Stats />
      {/* 
        ContactShadow로도 작성해보고 Leva의 contact shadow GUI로 그림자 제어하도록 설정
        */}
      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        frames={Infinity}
        {...args}
      />

      <OrbitControls enableDamping={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <group>
        <mesh castShadow ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" />
        </mesh>
        <mesh castShadow ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="#F9E79F" />
        </mesh>
        <mesh
          castShadow
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" />
        </mesh>
      </group>

      {/* 
        AccumulativeShadows는 frames 속성을 제공해줌
        */}
      {/* <AccumulativeShadows
        frames={Infinity}
        temporal
        blend={100}
        position={[0, -0.99, 0]}
        scale={20}
        color="#316d39"
        opacity={0.8}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
    </>
  );
}
