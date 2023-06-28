import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CylinderCollider, Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function Rigid() {
  const cube = useRef();
  const twister = useRef();
  const model = useGLTF("./books.glb");
  //   const [ hitSound ] = useState(() => new Audio("./hit.mp3"))

  const cubeJump = () => {
    console.log(cube.current);
    if (cube.current.isSleeping()) cube.current.wakeUp();
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
  };

  const collisionEvent = (event) => {
    console.log(
      // 상자에 collision을 target으로 줘서 상자를 주체로 나옴
      `${event.target.rigidBodyObject.name}가 ${event.other.rigidBodyObject.name}에 충돌`
    );

    // hitSound.currentTime = 0
    // hitSound.volume = Math.random()
    // hitSound.play()
  };

  // 개발자가 직접 물리적인 요소를 넣어준다.
  //   useFrame((state, delta) => {
  //     const time = state.clock.getElapsedTime();
  //     const euler = new THREE.Euler(0, time, 0);
  //     const quaternion = new THREE.Quaternion();
  //     quaternion.setFromEuler(euler);

  //     twister.current.setNextKinematicTranslation(quaternion);

  //     const x = Math.cos(time) * 2; // -2 ~ 2
  //     twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: 0 });
  //   });

  return (
    <>
      <Perf />
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <OrbitControls makeDefault />

      {/* 중력  - [1,0,0]이면 무언가에 막힐때까지 오른쪽 이동. default [0,-9.81,0]*/}
      <Physics debug gravity={[0, -9.81, 0]}>
        <RigidBody
          name="공"
          colliders="ball"
          position={[-1.5, 2, 0]}
          gravityScale={0.5}
          friction={1}
        >
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody>

        <RigidBody
          name="상자"
          ref={cube}
          position={[1.5, 2, 0]}
          friction={0.2}
          mass={0.1}
          onCollisionEnter={collisionEvent}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>

        <RigidBody name="바닥" type="fixed" friction={0}>
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

        {/* <RigidBody
          name="막대기"
          ref={twister}
          type="kinematicPosition"
          position={[0, -0.5, 0]}
        >
          <mesh scale={[0.5, 0.5, 4]}>
            <boxGeometry />
            <meshStandardMaterial color="yellow" />
          </mesh>
        </RigidBody> */}

        <RigidBody position={[0, 1, 0]} colliders="hull">
          {/* <CylinderCollider args={[0.5, 1.25]} /> */}
          <primitive object={model.scene} scale={5} position-y={-0.45}>
            <axesHelper />
          </primitive>
        </RigidBody>
      </Physics>
    </>
  );
}
