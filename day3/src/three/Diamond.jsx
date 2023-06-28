import React from "react";
import { useRef } from "react";
import { useGLTF, Caustics, MeshRefractionMaterial } from "@react-three/drei";
import { RGBELoader } from "three-stdlib";
import { useControls } from "leva";
import { useLoader } from "@react-three/fiber";

export default function Diamond(props) {
  const ref = useRef();
  const { nodes } = useGLTF("./diamond.glb");
  const texture = useLoader(RGBELoader, "./aerodynamics_workshop_4k.hdr");
  const config = useControls({
    bounces: { value: 3, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.03, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2.75, min: 0, max: 10 },
    fresnel: { value: 1, min: 0, max: 1 },
    color: "white",
    fastChroma: true,
  });

  console.log("nodes:", nodes.Gem.geometry);
  return (
    // <CubeCamera resolution={256} frames={1} envMap={texture}>
    // {(texture) => (
    <Caustics
      backfaces
      color={config.color}
      position={[0, -0.5, 0]}
      lightSource={[5, 5, -10]}
      worldRadius={0.1}
      ior={1.8}
      backfaceIor={1.1}
      intensity={0.2}
    >
      <mesh
        castShadow
        ref={ref}
        geometry={nodes.Gem.geometry}
        {...props}
      >
        <MeshRefractionMaterial
          envMap={texture}
          {...config}
          toneMapped={false}
        />
      </mesh>
    </Caustics>
    // )}
    // </CubeCamera>
  );
}
