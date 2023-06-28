import React from "react";
import { MeshTransmissionMaterial, Caustics } from "@react-three/drei";

export default function TexteredSphere() {
  return (
    <Caustics
      color="#3f85a1"
      position={[0, -0.5, 0]}
      lightSource={[5, 5, -10]}
      worldRadius={0.01}
      ior={1.2}
      intensity={0.005}
    >
      <mesh castShadow receiveShadow position={[-2, 1, 1]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          resolution={1024}
          distortion={0.25}
          color="#3f85a1"
          thickness={1}
          anisotropy={1}
        />
      </mesh>
    </Caustics>
  );
}
