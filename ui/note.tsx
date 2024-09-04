export function Note({ type, content }: { type: string; content: string }) {
  return (
    <div className="border border-black mt-3 p-1 text-sm">
      <h2 className="font-bold">{type}</h2>
      <p>{content}</p>
    </div>
  );
}
