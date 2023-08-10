"use client"

import {
  AccumulativeShadows,
  Caustics,
  Center,
  CubeCamera,
  Environment,
  MeshRefractionMaterial,
  OrbitControls,
  RandomizedLight,
  Sky,
  Sparkles,
  Stars,
  Text3D,
} from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { useControls } from "leva"
import { Color, Mesh, Texture } from "three"
import { RGBELoader } from "three-stdlib"

function BigText({ text }: { text: string }) {
  const textConfig = useControls("Text", {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  })
  return (
    <Center position={textConfig.position} rotation={textConfig.rotation}>
      <Text3D
        bevelEnabled
        bevelSegments={5}
        bevelThickness={0.2}
        castShadow
        font="super-funtime.json"
      >
        {text}
        <meshStandardMaterial metalness={0.9} roughness={0.1} />
        {/* <Sparkles count={10} scale={5 * 2} size={6} speed={0.4} /> */}
      </Text3D>
    </Center>
  )
}

function Refractor() {
  const refractorConfig = useControls("Refractor", {
    position: [0, 2, 0],
    causticPosition: [0, -0.5, 0],
  })
  const envTexture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
  )

  return (
    <CubeCamera envMap={envTexture} position={refractorConfig.position}>
      {(texture: Texture) => {
        return (
          <Center position={refractorConfig.causticPosition}>
            <Caustics
              causticsOnly={false}
              backside
              debug
              lightSource={[5, 5, -10]}
            >
              <mesh>
                <boxGeometry />
                <MeshRefractionMaterial envMap={texture} />
              </mesh>
            </Caustics>
          </Center>
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

      {/* With the sky element the background color is not used. */}
      {/* <color attach="background" args={[mainConfig.backgroundColor]} /> */}
      <ambientLight intensity={mainConfig.ambientLightIntensity} />

      <BigText text="Digital Garden" />
      {/* <Refractor /> */}
      {/* <mesh castShadow position={[-2, 0.5, -2]}>
        <sphereGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh> */}
      {/* <mesh castShadow position={[2, 0.5, 2]}>
        <sphereGeometry />
        <meshStandardMaterial color={"blue"} />
      </mesh> */}
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
      <Environment preset="forest" />
      <Sky sunPosition={[100, 20, 100]} />
      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) =>
          self.setColors(
            new Color(0xff2080),
            new Color(0x20ff80),
            new Color(0x2080ff)
          )
        }
      />
    </Canvas>
  )
}
