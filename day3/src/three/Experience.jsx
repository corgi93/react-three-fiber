import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { RigidBodyDesc } from "@dimforge/rapier3d-compat";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableDamping={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh position={[0, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody>
        {/* colliders를 false를 하면 충돌시 기본 속성이 해제됨 부딫히면 박히게 됨 */}
        <RigidBody
          colliders={false}
          position={[1, 1, -0.25]}
          rotation={[Math.PI / 3, 0, 0]}
          scale={[2, 1, 1]}
        >
          {/* 사용자 지정 colider (충돌체) */}
          <CuboidCollider args={[1.5, 1.5, 1.5]} />
          <mesh position={[0, 1, -0.25]} rotation={[Math.PI * 0.3, 0, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>

        <RigidBody>
          <mesh position={[3, 2, -1]}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
          <mesh position={[3, 2, 1.4]}>
            <boxGeometry args={[1, 0.5, 3]} />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh
            position-y={-1}
            rotation-x={THREE.MathUtils.degToRad(-90)}
            scale={10}
          >
            <circleGeometry />
            <meshBasicMaterial color="#5D6D7E" />
          </mesh>{" "}
          <mesh
            position-y={-1}
            rotation-x={THREE.MathUtils.degToRad(-90)}
            scale={10}
          >
            <circleGeometry />
            <meshBasicMaterial color="#5D6D7E" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
