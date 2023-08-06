"use client"

import { Canvas } from "@react-three/fiber"
import { ColorRepresentation } from "three"

export default function NatureScene({
  color = 0xffffff,
}: {
  color?: ColorRepresentation
}) {
  return (
    <>
      <Canvas h-48>
        <color attach="background" args={[color]} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </>
  )
}
