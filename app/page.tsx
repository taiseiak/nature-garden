import { Suspense } from "react";
import NatureScene from "./natureScene";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col h-96 w-full">
        <NatureScene />
      </section>
    </div>
  );
}
