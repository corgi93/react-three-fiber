import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import {
  CapsuleCollider,
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CHARACTER_HEIGHT = 1.79;
const CAPSULE_RADIUS = 0.6; // 높이가 radius * 2이상인 장애물을 캐릭터가 통과 못함..나무 막대기 통과 하기위해 0.2 -> 0.6

// 이동 상수 값
const WALK_SPEED = 2;
const RUN_SPEED = 4;

// 캐릭터 키보드 입력에 따라 캐릭터 방향 전환
const getDirectionOffset = (keys) => {
  let directionOffset = 0; // w
  if (keys.forward) {
    if (keys.leftward) {
      directionOffset = Math.PI / 4; // w+a (45)
    } else if (keys.rightward) {
      directionOffset = -Math.PI / 4; // w+d (-s45)
    }
  } else if (keys.backward) {
    if (keys.leftward) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a (135)
    } else if (keys.rightward) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d (-135)
    } else {
      directionOffset = Math.PI; // s (180)
    }
  } else if (keys.leftward) {
    directionOffset = Math.PI / 2; // a (90)
  } else if (keys.rightward) {
    directionOffset = -Math.PI / 2; // d (-90)
  }
  return directionOffset;
};

function Character({ orbitControls }, refRigid) {
  const model = useGLTF("./Robot.glb");
  const animations = useAnimations(model.animations, model.scene);

  const refPlayingActionName = useRef();
  const refModel = useRef();
  const refSpeed = useRef(0); // 초기 speed 0
  // const refRigid = useRef(); // 강체 ref지정

  // useCallback쓰면 한번만 사용하고 최적화 되므로
  const playAction = useCallback((actionName) => {
    // 현재 플레이 중인 액션 이름이 같으면 return
    if (refPlayingActionName.current == actionName) return;
    const action = animations.actions[actionName];
    console.log(animations.actions);

    const prevAction = animations.actions[refPlayingActionName.current];
    action.reset().fadeIn(0.5).play();
    prevAction?.fadeOut(0.5);

    refPlayingActionName.current = actionName;
  });

  useEffect(() => {
    model.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [model]);

  // 캐릭터가 넘어지지 않게 rotation lock
  useEffect(() => {
    refRigid.current.lockRotations(true);
  });

  // keyboard에 대한 감지를 구독
  // useKeyboardControls 훅을 쓰면 KeyboardControls 컴포넌트와 연동
  const [subscribeKeys, getKeys] = useKeyboardControls();
  useFrame((state, delta) => {
    const keys = getKeys();
    if (keys.jump) {
      playAction("Jump");
    }

    if (keys.forward || keys.leftward || keys.rightward || keys.backward) {
      // Shift키를 누르고 w,a,s,d를 누르면 걷는다.
      if (keys.run) {
        playAction("Run");
        refSpeed.current = RUN_SPEED;
      } else {
        playAction("Walk");
        refSpeed.current = WALK_SPEED;
      }
    } else {
      playAction("Idle");
      refSpeed.current = 0;
    }

    // 캐릭터를 카메라 방향으로 회전시키기
    const camera = state.camera;
    const model = refModel.current;
    const modelPosition = new THREE.Vector3();
    model.getWorldPosition(modelPosition);

    // 모델 카메라 방향으로 회전
    const angleCameraDirectionAxisY =
      Math.atan2(
        camera.position.x - modelPosition.x,
        camera.position.z - modelPosition.z
      ) + Math.PI;
    const rotateQuarternion = new THREE.Quaternion();
    rotateQuarternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      // 카메라 방향 + 키보드 누른 방향으로 캐릭터 가도록
      angleCameraDirectionAxisY + getDirectionOffset(keys)
    );
    // model을 카메라 방향으로
    model.quaternion.rotateTowards(
      rotateQuarternion,
      THREE.MathUtils.degToRad(5)
    );

    // 캐릭터 위치를 이동
    const walkDirection = new THREE.Vector3();
    camera.getWorldDirection(walkDirection);
    //  하늘 방향인 y축으로는 이동불가. (점프 제외)
    walkDirection.y = 0;
    walkDirection.normalize();
    walkDirection.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      getDirectionOffset(keys)
    );

    // 방향벡터
    const dx = walkDirection.x * (refSpeed.current * delta); // x축 변이량
    const dz = walkDirection.z * (refSpeed.current * delta); // z축 변이량

    // 강체(RigidBody)에 대한 위치 - translation으로 RigidBody에서 제공

    const cx = refRigid.current.translation().x + dx;
    const cy = refRigid.current.translation().y; // y축으로는 이동 x
    const cz = refRigid.current.translation().z + dz;
    //업데이트 된 캐릭터의 위치
    refRigid.current.setTranslation({ x: cx, y: cy, z: cz });

    // 카메라가 항상 캐릭터 바라보도록 - 캐릭터 이동시 항상 카메라가 추적하도록
    camera.position.x += dx;
    camera.position.z += dz;
    if (orbitControls) {
      orbitControls.current.target.set(cx, cy, cz);
    }
  });

  return (
    <RigidBody ref={refRigid} colliders={false} position={[0.1, 10, 0]}>
      <CapsuleCollider
        args={[CHARACTER_HEIGHT / 2 - CAPSULE_RADIUS, CAPSULE_RADIUS]}
      />
      <primitive
        ref={refModel}
        object={model.scene}
        position-y={-CHARACTER_HEIGHT / 2}
      >
        <axesHelper />
      </primitive>
    </RigidBody>
  );
}

// 자식에서 부모 ref 제어
export default forwardRef(Character);
