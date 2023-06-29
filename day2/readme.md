# React Three Fiber

## Three.js가 unreal/unity와 같은 라이브러리와 비교

- unreal, unity같은 좋은 그래픽 툴이 있는데 three.js의 가장 큰 장점은
  webGL같은 웹 표준 기술을 쓰고 있다 (webGPU는 그래픽만을 위한 표준 기술은 아니고 웹에서 그래픽카드를 직접 쓰게 하는 기술)

webGL로 삼각형을 하나 띄우려면 200줄이 넘는...
RAM에 있는 메모리에 올리걸 그래픽 카드에 올리는데 webGL은 매끄럽지 못한데 webGPU를 사용하면 직관적이고 매끄럽게 사용할 수 있다.

- threejs는 webGL, webGPU를 쓰기 쉽게 사용하기 위한 라이브러리.
  그래픽스에 대한 깊은 이해 (수학적 지식, 물리적 지식 등등)
  webGL -> webGPU로 옮기려면
  webGLRenderer -> webGPURenderer (네이밍이 맞는 지 모르겠는데) 이렇게 갈아끼워주면 된다

- 문서에 가면 webGPURenderer에 대한 참여가 활발하게 일어나고 있어서 더 기대가 커진다 [https://github.com/mrdoob/three.js/pull/26329]

- unreal / unity는 웹표준 기술을 사용하기 어렵다.

<hr>

## r3f(react three fiber)

react three fiber라는 라이브러리를 이용해 컴포넌트들을 학습

- fiber는 threejs객체를 생성해주는 Renderer

- Fiber의 캔버스 역할
  - scene생성
  - perspective camera생성 (카메나 내부적으로 생성)
  - render loop생성(객체를 돌리거나 하는 등)
  - ray casting방식의 pointer이벤트 설정 (onPointDown)
  - Tone Mapping설정 (ACEFimicToneMapping)
  - 출력 인코딩 설정이 되있음(sRGBEncoding)
  - Geometry, Material, Texture은 메모리에 올리면 GPU를 사용해야하는데 네이티브 Threejs에서는 메모리 관리를 개발자가 해줘야하는데 fiber에서 자동 관리해줍니다

<br>

## three.js와 fiber 코드 작성 연결

비교

```
// fiber
<mesh position={[1,2,3]} rotation-x={0.5}>
<boxGeometry />
<meshBa

// threejs
const mesh = new THREE.Mesh()
mesh.position.set(1, 2, 3)
mesh.rotation.x = 0.5
mesh.geometry = new THREE.B
mesh.material = new THREE.MeshBasicMaterial({ color: 'red' })
scene.add(mesh)
```

threejs는 객체 생성 후 그 안에 값으로

## react-fiber

### useFrame

프레임으로 애니메이션을 줄 때 사용하는 아주 중요한 hook

- state: three.js 관련 객체(Scene, Camera, Renderer, …)
- delta: 이전 프레임과 현재 프레임 사이 걸리 시간. (애니메이션 줄때 미세한 제어 등에 사용할 수도 있다)

```
const cubeRef = useRef();

useFrame((state, delta) => {
    console.log(state);
    cubeRef.current.rotation.y += delta;
});

return <>
      <mesh ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshBasicMaterial color="#F9E79E" />
      </mesh>
</>

```

### OrbitControl

OrbitControl로 3차원 관점으로 움직이며 볼 수 있는데 drei로는 쉽게 import해서 제공하지만 fiber에서는 THREE를 extend, useThree를 이용해서 사용할 수 있다.

- 주의) <orbitControls> 처럼 소문자로 해야 렌더링 된다(컨벤션)

리액트에서 fiber는 구성요소를 Scene에 담는데 리프레시 버튼을 눌러서 확인 virtualDOM을 잘 쓰진 못함.

```
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls: OrbitControls });


{/* 소문자로 하지 않으면 읽어서 불러오지 못한다(컨벤션) */}
<orbitControls args={[three.camera, three.gl.domElement]} />

```

### Camera

Canvas에서 직접 props로 줄 수 있다.

```
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [5, 10, 10],
      }}
    >
```

useFrame을 이용해 카메라 설정

```
// 카메라
  useFrame((state, delta) => {
    // elapsedTime: 처음 프로그램 시작되고 경과 시간
    const angle = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(angle) * 8; // -8 ~ 8
    state.camera.position.z = Math.cos(angle) * 8; // -8 ~ 8
    state.camera.lookAt(0, 0, 0); // camera가 원점(0,0,0)을 바라보게 한다.
  });

```

### Renderer 설정

renderer를 직적 설정할 수 있다.

- dpr : 픽셀 설정
- gl : GL(Graphics Library)로 렌더 (gpu로도 찾아보기)
  - antialias
  - toneMapping
  - outputEncoding

특별하게 개발자가 지정할 필요 없다면 기본값 사용하는 게 가장 좋다.

```

<Canvas
    dpr={[1,2]}
    gl={{
    antialias: false,
    toneMapping: THREE.LinearToneMapping,
    outputEncoding: THREE.LinearEncoding
}}
>

</Canvas>
```

<hr>

## Drei

Drei는 threejs를 이용해 만든 좋은 기능들을 컴포넌트화 한 패키지 (재사용성을 이용한)

### OrbitControls

위에서 THREE를 import해서 사용하던걸 Drei의 컴포넌트로 쉽게 사용가능

### TransformControls

mesh하나에 대한 위치를 변경해줄 수 있는 control

> OrbitControls와 TransformControls를 같이 쓰면 서로 주도권을 가지려고 하며 컨드롤이 안되는데 `<OrbitControls makeDefault />` makeDefault를 주면 해결

> useRef를 이용해 특정 mesh에 ref지정해서 사용하는 걸 권장

```
    const sphereRef = useRef()

    return(
     <TransformControls object={sphereRef} />
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" />
        </mesh>
        ...
    )

```

### Html

drei에서 제공해주는 Html이란 컴포넌트는 DOM에서 만들어주는 html로 style까지 지정해줄 수 있다.

mesh안에 Html을 넣으면 구체의 기준점을 기준으로 위치가 잡힌다.

```
    <mesh position-x={-2} ref={sphereRef}>
        <sphereGeometry />
        <Html wrapperClass='label2' center>구체입니다.</Html>

        <meshStandardMaterial color="#82E0AA" />
    </mesh>
```

- occlude 속성
  ref로 지정된 물체 뒤로 가면 사라지도록

```
<Html occlude={[cubeRef, sphereRef]}>
```

### Text

drei에선 Text라는 컴포넌트를 제공해주는데
ttf, woff, otf를 지원해줘 다운받아서 적용할 수 있다.

```
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
```

### Float

Text를 띄우거나 애니메이션을 줄 수 있다

<hr>

## Leva

Leva를 이용해 gui로 THREE 컴포넌트의 속성이나 color 등을 바꾸게 해주는 GUI를 제공

- 패키지 설치

```
npm install leva
```

## r3f-pref

해당 라이브러리로 메모리사용량 gpu사용량 FPS등을 현재 확인 해볼 수 있다.

FPS가 너무 떨어지면 코드를 확인하던 model디자이너에게 model을 수정하건 해야한다.
FPS만 확인하고 싶으면 drei의 <Stats />으로 사용할 수 있다.

> Control.jsx에 Leva, r3f-pref 참고하도록 작성

<hr>

## shadow

mesh에 그림자를 주는 방법. light가 있어야 shadow를 줄 수 있다.

1. Canvas에 그림자 설정을 해주고

```
return (
    <Canvas shadows>
    </Canvas>
    )
```

2. 광원에 그림자 설정

```
<directionalLight
    position={[1, 2, 3]} intensity={1.5}
    castShadow
    shadow-mapSize={[1024, 1024]}
    shadow-camera-near={1}
    shadow-camera-far={10}
    shadow-camera-top={2}
    shadow-camera-bottom={-2}
    shadow-camera-right={2}
    shadow-camera-left={-2}
/>

```

3. mesh에 그림자 설정
   castShadow / receiveShadow

```
<mesh castShadow ref={sphereRef} position-x={-2}>
    <sphereGeometry />
    <meshStandardMaterial color="#82E0AA" />
    </mesh>
    <mesh castShadow ref={cubeRef} position-x={2} scale={1.5}>
    <boxGeometry />
    <meshStandardMaterial color="#F9E79F" />
    </mesh>
    <mesh receiveShadow position-y={-1} rotation-x={THREE.MathUtils.degToRad(-90)} scale={10}>
    <circleGeometry />
    <meshStandardMaterial color="#5D6D7E" />
</mesh>
```

## 3D 배경

배경은 image도 있지만 (360도) 배경 자체를 모델링해서 더 실감형 콘텐츠를 제작할 수 있긴하다.

### 배경색 설정

1. css로 background-color로 주기

2. threejs에서 gl로 주는 법

```
const onCreated = (state) => {
    const gl = state.gl;
    gl.setClearColor("#ff0000", 1)}
    function App() {
    return (
        <Canvas onCreated={ onCreated }>
            <Experience />
        </Canvas>
    );
}
```

3. Canvas 내의 color태그로 주는 법

```
<color args={['ivory']} attach="background" />

```

### fog (안개)

fog태그로 사용 near로 안개 거리 조정

```
export default function Experience() {
return <>
…
<fog attach="fog" color={"#abddfc"} near={10} far={100} />
</>
}
```

### Sky (하늘) & Cloud

drei의 Sky 컴포넌트를 이용할 수 있다.
sunPosition을 Leva로 컨트롤해서 작성해봄.

```
import { OrbitControls, Sky } from "@react-three/drei";
import { useControls } from "leva";

const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

...
<Sky sunPosition={sunPosition} />

```

### Environment

drei의 Environment 컴포넌트를 사용해 광원을 추가하지 않아도 조명의 기능을 제공함.
light는 끄고 확인가능

- 이미지를 이용한 환경
  이미지로 하는 건 옛날 방식..

```
    <Environment
        background
        files={[
          "./Yokohama/posx.jpg",
          "./Yokohama/negx.jpg",
          "./Yokohama/posy.jpg",
          "./Yokohama/negy.jpg",
          "./Yokohama/posz.jpg",
          "./Yokohama/negz.jpg",
        ]}
      />
      <Perf position="top-left" />
      <OrbitControls enableDamping={false} />
      {/*
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      */}

```

https://www.humus.name/index.php?page=Textures

- HDRI를 이용한 환경

이미지보다 정확한 데이터를 제공

> HDRI download 구글 검색해서 사용가능

```
<Environment
  background
  files="./hdri/lake_pier_4k.hdr"
/>
```

- High Dynamic Range Image의 약자로 1개 이미지로 구성된 환경

* 환경으로 인한 조명 세기는 Material의 envMapIntensity로 조정 가능함

* drei에서도 기본 저해상도 hdri 제공
  [https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts]

### Stage

- 최소한 설정으로 배경을 만드는 Helper
- drei에서 제공해주고 환경설정, 그림자설정, 2개의 DirectionalLight를 제공하고 장면을 중앙으로 정렬해줌

```
<Stage>
  <mesh ref={sphereRef} position-x={-2}>
  <sphereGeometry />
  <meshStandardMaterial color="#82E0AA" envMapIntensity={1} />
  </mesh>
  <mesh ref={cubeRef} position-x={2} scale={1.5}>
  <boxGeometry />
  <meshStandardMaterial color="#F9E79F" envMapIntensity={intensity} />
  </mesh>
  {/* <mesh position-y={-1} rotation-x={THREE.MathUtils.degToRad(-90)} scale={10}>
  <circleGeometry />
  <meshStandardMaterial color="#5D6D7E" envMapIntensity={intensity} />
  </mesh> */}
</Stage>
```

<hr>

## 3D모델

1.  r3f의 useLoader, THREE의 GLTFLoader를 이용하는 방법

2.  drei의 useGLTF, useFBX hook을 이용한 로딩 방법

drei를 사용하면 DRACO 압축 방식도 자동으로 처리해줘 용량도 10분의 1정도 줄일 수 있다! THREE를 쓰는 거 보다 최적화에 좋음

### Preloading

모델 데이터를 미리 다운하는 방식으로 훨씬 빠르다
useGLTF와 useGLTF.preload의 인자로 받는 데이터 URL이 동일해야함.

### Clone

drei의 model 객체를 clone해서 사용할 수 있다

### GLTF 컴포넌트화(코드화)
온라인 툴에서 사용가능하다[https://gltf.pmnd.rs/]



<hr>

## picking (이벤트 처리)
mesh에 대한 onClick을 줄 수 있다.

```
<mesh onClick={ () => { console.log("클릭") } }
ref={cubeRef} position-x={2} scale={1.5}>
  <boxGeometry />
  <meshStandardMaterial color="#F9E79F" />
</mesh>
```

ref로 mesh를 지정해서 속성 값을 바꿔주거나 할 수 있다. mesh의 onClick 이벤트 시 중요한 값 

```
mesh onClick={ (event) => { console.log(event) }}

```
### 위에서 event에 mesh의 많은 정보중 특히 중요한 값들
- distance : 카메라와 클릭한 지점 사이의 거리
- point : 클릭한 지점(3D 좌표)
- uv : 클릭한 지점의 uv 좌표
- object : 이벤트를 발생한 객체(이 경우 Mesh)
- eventObject : 이벤트 리스너가 할당된 객체
- x : 클릭한 지점의 화면 좌표 X
- y : 클릭한 지점의 화면 좌표 Y
- shiftKey
- ctrlKey
- metaKey
- ray
- face
- faceId


### onClick외 다른 이벤트
- onContextMenu
- onDouleClick
- onPointerUp
- onPointerDown
- onPointerOver / onPointEnter : mouseon 같은 
- onPointerOut / onPointLeave :mouse out같은
```
        <mesh
          onClick={(event) => {
            console.log("박스 선택");
            event.stopPropagation();
          }}
          onPointerEnter={(event) => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={(event) => {
            document.body.style.cursor = "default";
          }}
          ref={cubeRef}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="#F9E79F" />
        </mesh>

```

- onPointerMove
- onPointerMissed : Canvas에 지정할 경우 클릭 시 매시에 대한 onClick 이벤트가 없는 경우에 발생

## postProcessing
이미지를 만들고 출력하기 직전에 이미지에 대한 후처리 (blur를 준다거나 , noise를 준다거나, 조도를 바꾼다거나, 흑백으로 처리 등등)

- 패키지 설치
``` npm install @react/postprocessing```

/three/PostProcessing.jsx 참조

### Bloom
Bloo Effect는 활용도가 높으니 참고.

### DepthOfField 
DepthOfField Effect는 뒤에 있는 건 뿌옇게 보이게하는 이펙트

