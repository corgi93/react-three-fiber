import {
  OrbitControls,
  Environment,
  SoftShadows,
  Sky,
} from "@react-three/drei";
import * as THREE from "three";
import Character from "./Character";
import Avatar from "./Avatar";
import { Perf } from "r3f-perf";
import { Debug, Physics, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stage } from "./Stage";
import { City } from "./City";

export default function Space() {
  const refOrbitControls = useRef();
  const refLight = useRef();
  const refShadowCamera = useRef();
  const scene = useThree((state) => state.scene);
  const refCharacterRigid = useRef(); //자식으로 보내줄 강체ref

  // const shadowCameraSize = 20;

  useFrame(() => {
    if (refCharacterRigid.current) {
      const translation = refCharacterRigid.current.translation();
      const cx = translation.x;
      const cy = translation.y;
      const cz = translation.z;

      const cPosition = new THREE.Vector3(cx, cy, cz);
      const lightRevertDirection = new THREE.Vector3(0, 1, 1).normalize(); // 캐릭터에서 광원의 방향의 거리 (L)
      const newPosition = lightRevertDirection.multiplyScalar(8).add(cPosition);

      // 새로운 위치로 광원을 다시 잡아준다
      if (refLight) {
        refLight.current.target.position.copy(cPosition);
        refLight.current.position.copy(newPosition);
      }
    }

    refShadowCamera.current?.update();
  });

  useEffect(() => {
    // light 절두체 Helper추가
    refShadowCamera.current = new THREE.CameraHelper(
      refLight.current.shadow.camera
    );
    // add를 하지 않으면 행렬 연산을 하지 않는다.
    scene.add(refShadowCamera.current);
    scene.add(refLight.current.target);

    return () => {
      // fiber를 쓰지 않고 THREE를 쓸 경우 개발자가 직접 해제 해줘야한다.
      scene.remove(refShadowCamera.current);
      scene.remove(refLight.current.target);
    };
  }, [refLight.current]);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls ref={refOrbitControls} makeDefault enablePan={false} />
      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight
        ref={refLight}
        position={[0, 1, 2]}
        intensity={1}
        castShadow
        // light 절두체가 작아서 잘리니 맵을 전체 다 포괄하게 키우면 임시적인 그림자 잘림현상은 해결가능
        shadow-normalBias={0.1}
        // shadow-mapSize={[1024 * 4, 1024 * 4]}
        // shadow-camera-near={1}
        // shadow-camera-far={25}
        // shadow-camera-top={shadowCameraSize}
        // shadow-camera-bottom={-shadowCameraSize}
        // shadow-camera-right={shadowCameraSize}
        // shadow-camera-left={-shadowCameraSize}
      />
      <Environment preset="city" intensity={1} />
      <Sky />
      <SoftShadows size={8} focus={0} samples={8} />

      {/* <mesh
        receiveShadow
        rotation-x={THREE.MathUtils.degToRad(-90)}
        scale={100}
      >
        <planeGeometry />
        <meshStandardMaterial color="#5d6d72" />
      </mesh>

      <Character /> */}

      <Physics>
        {/* <Debug />dw */}
        <RigidBody colliders="ball">
          <mesh position={[4, 10, 0]} castShadow receiveShadow>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody>
        <RigidBody colliders="trimesh">
          <mesh
            position={[1, 1, -5.25]}
            rotation={[Math.PI * 0.3, 0, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[5, 1, 0.25]} />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>

        {/* blender에서 만든 무대 Stage로 변경 */}
        {/* <RigidBody type="fixed">
          <mesh
            receiveShadow
            rotation-x={THREE.MathUtils.degToRad(-90)}
            scale={100}
          >
            <planeGeometry />
            <meshStandardMaterial color="#5d6d72" />
          </mesh>
        </RigidBody> */}

        <RigidBody type="fixed" colliders="trimesh">
          {/* <Stage /> */}
          <City />
        </RigidBody>

        {/* OrbitControls를 자식에서 제어하도록 ref로 지정한 걸 props로 전달 */}
        <Character ref={refCharacterRigid} orbitControls={refOrbitControls} />
      </Physics>
    </>
  );
}
