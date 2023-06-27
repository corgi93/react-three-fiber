import { Cloud, Environment, OrbitControls, Sky } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Background() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { intensity } = useControls({
    intensity: {
      value: 1,
      min: 0,
      max: 12,
    },
  });

  return (
    <>
      {/* <Cloud color="red" position={[-4, 5, -25]} speed={0.2} opacity={1} />
      <Cloud position={[4, 6, -15]} speed={0.2} opacity={0.5} />
      <Cloud position={[4, 4, -5]} speed={1.5} opacity={0.6} />

      <Sky sunPosition={sunPosition} />
      <fog attach={"fog"} color={"#efefef"} near={1} far={50} /> */}

      {/* <Environment
        background
        files={[
          "./Yokohama/posx.jpg",
          "./Yokohama/negx.jpg",
          "./Yokohama/posy.jpg",
          "./Yokohama/negy.jpg",
          "./Yokohama/posz.jpg",
          "./Yokohama/negz.jpg",
        ]}
      /> */}

      <Environment
        background
        files="./hdri/lake_pier_4k.hdr"
      />
      <Perf position="top-left" />
      <OrbitControls enableDamping={false} />
      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} /> */}
      <group>
        <mesh ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" envMapIntensity={intensity} />
        </mesh>
        <mesh ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="#F9E79F" envMapIntensity={intensity} />
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
    </>
  );
}
