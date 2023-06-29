import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import {
  Bloom,
  EffectComposer,
  Glitch,
  Noise,
  DepthOfField,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { GlitchMode, BlendFunction } from "postprocessing";

export default function PostProcessing() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  const { focalLength, focusDistance } = useControls({
    focusDistance: {
      value: 0,
      min: 0,
      max: 2,
      step: 0.00001,
    },
    focalLength: {
      value: 0,
      min: 0,
      max: 2,
      step: 0.00001,
    },
    bokehScale: {
      value: 16,
      min: 0,
      max: 20,
      step: 0.00001,
    },
  });

  //   // glitch
  //   const { delay, duration, strength, mode } = useControls({
  //     delay: { value: [0.5, 1] },
  //     duration: { value: [0.1, 0.3] },
  //     strength: { value: [0.2, 0.4] },
  //     mode: { options: Object.keys(GlitchMode) },
  //   });

  //   // noise
  //   const { blendFunction } = useControls({
  //     blendFunction: { options: Object.keys(BlendFunction) },
  //   });

  //   // Vignette 주위 어둡게
  //   const { offset, darkness, blend } = useControls({
  //     offset: { value: 0.3, min: -10, max: 10, step: 0.01 },
  //     darkness: { value: 0.9, min: -10, max: 10, step: 0.01 },
  //     blend: { options: Object.keys(BlendFunction) },
  //   });

  return (
    <>
      {/*  배경이 어두울수록 Bloom(광선)이 강하게 표현 */}
      <color args={["#000000"]} attach="background" />

      <Perf position="top-left" />
      <OrbitControls enableDamping={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <group>
        <mesh ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" />
        </mesh>
        <mesh ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          {/* 
            - 재질의 toneMapped를 false로 꺼야함
            - 색상 요소 값을 1 이상으로 줌(클수록 효과가 세짐)
          */}
          <meshStandardMaterial
            color={[8, 1, 1]}
            toneMapped={false}
            emissive={"white"}
            emissiveIntensity={4}
          />
        </mesh>
        <mesh
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" />
        </mesh>
      </group>

      {/* multisampling을 키울수록 매끄러워짐. 너무 많아지면 렌더링 비용이 커짐*/}
      <EffectComposer multisampling={8}>
        {/* <Glitch
          delay={delay}
          duration={duration}
          strength={strength}
          mode={GlitchMode[mode]}
        /> */}

        {/* <Noise premultiply blendFunction={BlendFunction[blendFunction]} /> */}

        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0.4} />

        <DepthOfField
          focusDistance={focusDistance}
          focalLength={focalLength}
          bokehScale={16}
        />
      </EffectComposer>
    </>
  );
}
