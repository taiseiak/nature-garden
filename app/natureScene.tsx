"use client"

import {
  AccumulativeShadows,
  Caustics,
  CubeCamera,
  Environment,
  MeshRefractionMaterial,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { useControls } from "leva"
import { Texture } from "three"
import { RGBELoader } from "three-stdlib"

function Diamond() {
  const diamondConfig = useControls("Diamond", {
    position: [0, 2, 0],
    causticPosition: [0, -1, 0],
  })
  const envTexture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
  )

  return (
    <CubeCamera envMap={envTexture}>
      {(texture: Texture) => {
        return (
          <Caustics
            causticsOnly={false}
            backside
            debug
            position={diamondConfig.causticPosition}
            lightSource={[5, 5, -10]}
          >
            <mesh castShadow position={diamondConfig.position}>
              <torusKnotGeometry />
              <MeshRefractionMaterial envMap={texture} />
            </mesh>
          </Caustics>
        )
      }}
    </CubeCamera>
  )
}

export default function NatureScene() {
  // Helpers
  //   const directionalLightRef = useRef<DirectionalLight>(null!)
  //   useHelper(directionalLightRef, DirectionalLightHelper, 1, "hotpink")

  // Debug controls
  const mainConfig = useControls("Main", {
    directionalLightPosition: [0, 0, 0],
    directionalLightIntensity: { value: 1, min: 0, max: 5 },
    ambientLightIntensity: { value: 0.5, min: 0, max: 5 },
    backgroundColor: "#f0f0f0",
  })

  return (
    <Canvas shadows camera={{ position: [-5, 0.5, 5], fov: 45 }}>
      <Perf />

      <color attach="background" args={[mainConfig.backgroundColor]} />
      <ambientLight intensity={mainConfig.ambientLightIntensity} />

      <Diamond />
      <mesh castShadow position={[-2, 0.5, -2]}>
        <sphereGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <mesh castShadow position={[2, 0.5, 2]}>
        <sphereGeometry />
        <meshStandardMaterial color={"blue"} />
      </mesh>
      <AccumulativeShadows
        temporal
        frames={100}
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.3}
        opacity={0.5}
        scale={12}
        position={[0, -0.5, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={10}
          ambient={0.5}
          intensity={1.5}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  )
}
