export function Title({ title }: { title: string }) {
  return (
    <div className="flex justify-center w-full bg-gray-400 mb-3 ">
      <h1 className="font-bold">&#9660; {title} &#9660;</h1>
    </div>
  );
}
