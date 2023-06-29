# 가상공간 만들기

## 키보드 컨드롤러

drei에서 제공해주는 KeyboardControl로 제어할 수 있다.
(아니면 document객체에서 eventListener로 등록해서 사용)

```
import { KeyboardControls } from "@react-three/drei";
function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "walk", keys: ["Shift"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas shadows>
        <Space />
      </Canvas>
    </KeyboardControls>
  );
}

```

- useCallback으로 action 최적화

- 모델 카메라 방향으로 회전

아크 탄젠트 값으로 구한다.

```
const angleCameraDirectionAxisY = Math.atan2(
(this.#camera.position.x - this.#model.position.x),
(this.#camera.position.z - this.#model.position.z)
) + 보정값;


```

> Quaternion 사용이유

오일러 각을 사용하면 3개의 축으로 나누게 되니 원하는 데로 안됨.
quaternion은 하나의 축을 기준으로 한 번에 움직여 짐벌락 현상이 안생김.

> > 짐벌락과 쿼터니언 찾아보기

## 강체

강체라고 하는건 단단한. 이동과 회전만 되는.. 물체.
(크기가 절대 변하지 않음)

캐릭터를 RigidBody로 강체로 설정을 했는데 이렇게하면
뛰다 멈추면 넘어진다... 방향을 lock해주면 된다.

```

  // 캐릭터가 넘어지지 않게 rotation
  useEffect(() => {
    refRigid.current.lockRotations(true);
  });

```

## 카메라가 항상 캐릭터 바라보게 하기

OrbitControls를 제어한다는 말이다.
Space.jsx에서 Character.jsx로 orbitControls props로 전달

Character.jsx

```
// useFrame안에서 아래 코드 추가
   camera.position.x += dx;
    camera.position.z += dz;
    if (orbitControls) {
      orbitControls.current.target.set(cx, cy, cz);
    }
```

## 그림자가 잘리는 현상

1. 임시방편
   Light절두체의 크기를 키운다

```
  const shadowCameraSize = 20;

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

```

2. 그림자를 위한 카메라가 항상 캐릭터를 일정한 각도로 추적하도록
   (즉, 그림자 카메라(여기서는 directionalLight사용)의 절두체 안에 캐릭터가 항상 존재하도록)


### 아바타 생성

https://readyplayer.me/avatar