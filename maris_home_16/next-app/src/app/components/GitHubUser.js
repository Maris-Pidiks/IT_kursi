import { Suspense } from "react";
import LoadingState from "@/app/components/LoadingState";

async function getGithubUser() {
  try {
    const res = await fetch("https://api.github.com/users/your-github-username", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

export default async function GithubUserPage() {
  const user = await getGithubUser();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
          <p>Could not fetch GitHub user information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <Suspense fallback={<LoadingState />}>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600">@{user.login}</p>
                </div>
              </div>
              <p className="mt-4">{user.bio}</p>
              <div className="stats shadow mt-6">
                <div className="stat">
                  <div className="stat-title">Repositories</div>
                  <div className="stat-value">{user.public_repos}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Followers</div>
                  <div className="stat-value">{user.followers}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Following</div>
                  <div className="stat-value">{user.following}</div>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
