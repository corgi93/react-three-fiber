import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useEffect } from "react";
import * as THREE from "three";

export default function Groot(props) {
  const treeBoy = useGLTF("./TreeBoy.glb");
  console.log("treeBoy", treeBoy);

  const animations = useAnimations(treeBoy.animations, treeBoy.scene);
  const { animationName } = useControls({
    animationName: { options: animations.names },
  });
  useEffect(() => {
    treeBoy.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
      }
    });
  }, [treeBoy]);

  useEffect(() => {
    console.log(animationName);
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [animationName]);

  return (
    <group>
      <Perf position="top-left" />
      <OrbitControls enableDamping={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <primitive object={treeBoy.scene} {...props} />;
      <mesh
        position-y={-1}
        rotation-x={THREE.MathUtils.degToRad(-90)}
        scale={10}
      >
        <circleGeometry />
        <meshStandardMaterial color="#5D6D7E" />
      </mesh>
    </group>
  );
}
