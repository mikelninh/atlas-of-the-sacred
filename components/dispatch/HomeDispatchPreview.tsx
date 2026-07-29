import Link from "next/link";
import { DispatchCard } from "@/components/dispatch/DispatchCard";
import { getPublishedDispatches } from "@/lib/dispatches";

export function HomeDispatchPreview() {
  const dispatches = getPublishedDispatches().slice(0, 3);

  return (
    <section className="home-dispatches" id="dispatches">
      <div className="home-dispatches-heading">
        <div>
          <p className="eyebrow">The Atlas stays alive</p>
          <h2>Dispatches from Deep Time</h2>
        </div>
        <div>
          <p>Research changes the map. We track what became clearer, what was exaggerated and which claims deserve another look.</p>
          <Link href="/dispatches/">Open the discovery feed →</Link>
        </div>
      </div>
      <div className="home-dispatches-grid">
        {dispatches.map((dispatch, index) => <DispatchCard dispatch={dispatch} featured={index === 0} key={dispatch.id} />)}
      </div>
    </section>
  );
}
