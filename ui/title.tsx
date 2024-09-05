export function Title({ title }: { title: string }) {
  return (
    <div className="flex justify-center w-full bg-gray-300 mb-3 border border-black">
      <h1 className="font-bold">{title}</h1>
    </div>
  );
}
