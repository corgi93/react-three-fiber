import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function Force() {
  const cube = useRef();

  const cubeJump = () => {
    console.log(cube.current); 

    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <OrbitControls makeDefault />
      <Physics debug>
        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody>

        <RigidBody position={[1.5, 2, 0]} ref={cube}>
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh
            receiveShadow
            position-y={-1.25}
            rotation-x={THREE.MathUtils.degToRad(-90)}
            scale={10}
          >
            <planeGeometry />
            <meshStandardMaterial color="#5D6D7E" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
