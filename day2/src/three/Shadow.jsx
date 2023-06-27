import {
  OrbitControls,
  SoftShadows,
  Stats,
  TransformControls,
  useHelper,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Shadow() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const lightRef = useRef();
  const shdaowCameraRef = useRef();

  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });

  useHelper(lightRef, THREE.DirectionalLightHelper, 0.5);

  const scene = useThree((state) => state.scene);
  useEffect(() => {
    // 카메라 절두체를 띄우는 helper
    shdaowCameraRef.current = new THREE.CameraHelper(
      lightRef.current.shadow.camera
    );

    scene.add(shdaowCameraRef.current);
    return () => {
      // THREE를 직접사용하므로 remove로 메모리 해제해줘야 함.
      scene.remove(shdaowCameraRef.current);
    };
  }, [lightRef.current]);

  return (
    <>
      <Stats />
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={lightRef}
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        // mapSize로 픽셀을 높힐수록 그림자 선명
        // 절두체가 너무 크면 풀질이 떨어짐
        // THREE에서는 shadow.camera.near인데 fiber에서는 -(대쉬)로
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-right={10}
        shadow-camera-left={-10}
      />

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
          receiveShadow
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" />
        </mesh>
      </group>

      {enabled && <SoftShadows {...config} />}
    </>
  );
}
