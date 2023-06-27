import { useFrame } from "@react-three/fiber";
import {
  Float,
  Html,
  OrbitControls,
  Text,
  TransformControls,
} from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  // frame 주기
  const cubeRef = useRef();

  // mesh ref
  const sphereRef = useRef();

  // 애니메이션
  // useFrame((state, delta) => {
  //   // console.log("state: ", state);
  //   // console.log("delta:", delta);
  //   cubeRef.current.rotation.y += 0.1;
  //   cubeRef.current.rotation.x += 0.01;
  // });

  // // 카메라
  // useFrame((state, delta) => {
  //   // elapsedTime: 처음 프로그램 시작되고 경과 시간
  //   const angle = state.clock.elapsedTime;
  //   state.camera.position.x = Math.sin(angle) * 8; // -8 ~ 8
  //   state.camera.position.z = Math.cos(angle) * 8; // -8 ~ 8
  //   state.camera.lookAt(0, 0, 0); // camera가 원점(0,0,0)을 바라보게 한다.
  // });

  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <group>
        {/* <Html wrapperClass="label" position={[0, 2, 2]} center
          occlude={[sphereRef, cubeRef]}
        >
          <div>
            안녕하세요!
          </div>
        </Html> */}

        <Float speed={7} floatIntensity={10}>
          <Text
            font="./NotoSansKR-Regular.otf"
            fontSize={1.5}
            color="salmon"
            textAlign="center"
            position={[0, 3, 0]}
            maxWidth={4}
          >
            멋진 R3F!
          </Text>
        </Float>
        <TransformControls object={sphereRef} />

        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          {/* 위의 Html과 다르게 mesh안에 넣으면 이 mesh를 기준으로 Html이 따라감 */}
          <Html wrapperClass="label2" center>
            구체입니다.
          </Html>
          <meshStandardMaterial color="#82E0AA" />
        </mesh>

        <Float speed={7} floatIntensity={10}>
          <boxGeometry />
        </Float>

        <mesh ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="#F9E79E" />
        </mesh>

        {/*
        degree to radian
        180도 =(radian으로 바꾸면) PI
        90도 = PI/2  
       */}
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
