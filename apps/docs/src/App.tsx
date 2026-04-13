import { Gallery } from "./components/Gallery";
import { Playground } from "./components/Playground";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          react-spinners-kit-max
        </h1>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          36 animated spinners for React
        </p>
      </header>

      <main className="mx-auto max-w-7xl space-y-14 px-4 pb-16 sm:px-6">
        <section>
          <h2 className="mb-5 text-xl font-semibold">Gallery</h2>
          <Gallery />
        </section>

        <section>
          <h2 className="mb-5 text-xl font-semibold">Playground</h2>
          <Playground />
        </section>
      </main>
    </div>
  );
}

export default App;