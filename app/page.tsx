import { Suspense } from "react"
import NatureScene from "./natureScene"

export default function Home() {
  return (
    <div>
      <section className="flex flex-col h-96 w-full">
        <NatureScene color={0xff0000} />
      </section>
      <section className="flex flex-col h-96 w-full">
        <NatureScene color={0x00ff00} />
      </section>
      <section className="flex flex-col h-96 w-full">
        <NatureScene color={0x0000ff} />
      </section>
    </div>
  )
}
