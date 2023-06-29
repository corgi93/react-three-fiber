import { Canvas, applyProps } from "@react-three/fiber";
import "./App.css";
import * as THREE from "three";
import Experience from "./three/Experience";
import Force from "./three/Force";
import Rigid from "./three/Rigid";
import Monkey from "./three/Monkey";
import { FlakesTexture } from "three/examples/jsm/textures/FlakesTexture";

import {
  OrbitControls,
  useGLTF,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  Center,
} from "@react-three/drei";

import { useLayoutEffect } from "react";
import Diamond from "./three/Diamond";

import { EffectComposer, Bloom } from "@react-three/postprocessing";
import TexteredSphere from "./three/TexteredSphere";
import Avatar from "./three/Avatar";

function Suzi(props) {
  const { scene, materials } = useGLTF("./suzan.glb");

  useLayoutEffect(() => {
    scene.traverse(
      (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true)
    );
    materials.default.color = new THREE.Color("orange");
    materials.default.roughness = 0.18;
    materials.default.metalness = 1;
    materials.default.normalMap = new THREE.CanvasTexture(
      new FlakesTexture(),
      THREE.UVMapping,
      THREE.RepeatWrapping,
      THREE.RepeatWrapping
    );

    materials.default.normalMap.repeat = new THREE.Vector2(40, 40);
    materials.default.normalMap.normalSize = new THREE.Vector2(0.05, 0.05);
  });
  return <primitive object={scene} {...props} />;
}

function App() {
  // 배경색 설정하는 법 gl에서 세팅

  return (
    // <Canvas>
    //   {/* <Experience /> */}
    //   {/* <Force /> */}
    //   {/* <Rigid /> */}
    // </Canvas>

    /**
     * 실습1
     */
    // <Canvas shadows>
    //   <color attach="background" args={["#f0f0f0"]} />

    //   <EffectComposer>
    //     <Bloom luminanceThreshold={1} intensity={2} levels={8} mipmapBlur />
    //   </EffectComposer>
    //   <AccumulativeShadows
    //     temporal
    //     frames={100}
    //     color="orange"
    //     colorBlend={2}
    //     toneMapped={true}
    //     alphaTest={0.8}
    //     opacity={1}
    //     scale={12}
    //     position={[0, -0.5, 0]}
    //   >
    //     <RandomizedLight
    //       amount={8}
    //       radius={10}
    //       ambient={0.5}
    //       intensity={1}
    //       position={[5, 5, -10]}
    //       bias={0.001}
    //     />
    //   </AccumulativeShadows>
    //   <OrbitControls makeDefault />
    //   <Diamond rotation={[0, 0, 0.75]} position={[2, 0.6, 0]} />

    //   {/* 유리구슬 추가 */}
    //   <Environment files={"./aerodynamics_workshop_4k.hdr"} />
    //   <TexteredSphere />
    // </Canvas>

    /**
     * 실습3
     */
    // <Canvas shadows camera={{ position: [8, 1.5, 8], fov: 100 }}>
    //   <color args={["goldenrod"]} attach="background" />
    //   {/* <ambientLight intensity={0.1} /> */}

    //   <axesHelper />
    //   <directionalLight position={[1, 1, 1]} intensity={1.3} />
    //   <Environment preset="city" />
    //   <AccumulativeShadows
    //     temporal
    //     frames={120}
    //     color="orange"
    //     colorBlend={2}
    //     toneMapped={true}
    //     alphaTest={0.9}
    //     opacity={2}
    //     scale={12}
    //   >
    //     <RandomizedLight
    //       amount={8}
    //       radius={4}
    //       ambient={0.5}
    //       intensity={1}
    //       position={[5, 5, -10]}
    //       bias={0.001}
    //     />
    //   </AccumulativeShadows>

    //   <OrbitControls makeDefault />

    //   <Center top>
    //     <Suzi rotation={[-0.63, 0, 0]} scale={2} />
    //   </Center>

    //   <Center top position={[-2, 0, 1]}>
    //     <mesh castShadow>
    //       <sphereGeometry args={[0.25, 64, 64]} />
    //       <meshStandardMaterial color="lightblue" />
    //     </mesh>
    //   </Center>
    //   <Center top position={[2.5, 0, 1]}>
    //     <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
    //       <boxGeometry args={[0.5, 0.5, 0.5]} />
    //       <meshStandardMaterial color="indianred" />
    //     </mesh>
    //   </Center>
    // </Canvas>

    <Canvas shadows camera={{ fov: 30 }}>
      <OrbitControls makeDefault />
      <Environment preset="city" />
      <Center position={[0, -0.7, 0]}>
        <Avatar />
      </Center>
      <ambientLight intensity={0.2} />
    </Canvas>
  );
}

export default App;
