export function ChecklistLine({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="flex justify-between">
      <div>{left}</div>
      <div className="grow border-b-2 border-dotted border-black h-[18px] mx-1"></div>
      <div>{right}</div>
    </div>
  );
}
