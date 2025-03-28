import GetGames from "../../components/GetGames";

export default function GamesPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Latest Games</h1>
      <GetGames />
    </div>
  );
}
