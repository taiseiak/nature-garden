import { Suspense } from "react"
import NatureScene from "./natureScene"

export default function Home() {
  return (
    <div>
      <section className="flex flex-col h-screen w-full">
        <NatureScene />
      </section>
    </div>
  )
}
