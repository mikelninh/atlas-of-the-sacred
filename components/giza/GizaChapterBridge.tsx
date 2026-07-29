export function GizaChapterBridge({
  number,
  prompt,
  nextId,
  nextLabel,
}: {
  number: string;
  prompt: string;
  nextId?: string;
  nextLabel?: string;
}) {
  return (
    <div className="giza-chapter-bridge">
      <span>Carry forward · {number}</span>
      <p>{prompt}</p>
      {nextId && nextLabel ? <a href={`#${nextId}`}>Continue to {nextLabel} ↓</a> : null}
    </div>
  );
}
