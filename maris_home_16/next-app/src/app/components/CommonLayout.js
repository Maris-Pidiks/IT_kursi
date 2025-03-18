export default function CommonLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      <div className="max-w-6xl mx-auto flex-col flex-grow">
        <div>{children}</div>
      </div>
    </div>
  );
}
