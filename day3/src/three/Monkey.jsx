import { OrbitControls, useGLTF } from "@react-three/drei";
import { useLayoutEffect } from "react";
import { Canvas, applyProps } from "@react-three/fiber";

function Suzi(props) {
  const { scene, materials } = useGLTF("./suzan.glb");
  useLayoutEffect(() => {
    console.log("dd");
    scene.traverse(
      (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true)
    );
    applyProps(materials.default, {
      color: "orange",
      roughness: 0,
    });
  });
  return <primitive object={scene} {...props} />;
}
function Monkey() {
  return (
    <Canvas shadows camera={{ position: [8, 1.5, 8], fov: 25 }}>
      <OrbitControls makeDefault />
      {/* <Center top> */}
      <Suzi rotation={[-0.63, 0, 0]} scale={2} />
      {/* </Center> */}
    </Canvas>
  );
}
export default Monkey;
