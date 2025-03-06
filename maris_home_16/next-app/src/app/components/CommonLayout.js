export default function CommonLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      <div className="flex-grow">{children}</div>
    </div>
  );
}
