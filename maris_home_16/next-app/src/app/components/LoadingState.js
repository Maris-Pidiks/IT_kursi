export default function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-success"></div>
      <span className="ml-3 text-xl">Loading...</span>
    </div>
  );
}
