import { useQuery } from "@apollo/client/react";
import { GET_EPISODES } from "../graphql/queries";
import { EpisodeProps, InfoProps } from "../interfaces";
import EpisodeCard from "../components/common/EpisodeCard";
import React, { useEffect, useState } from "react";

export const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data, refetch } = useQuery<{
    episodes: { info: InfoProps; results: EpisodeProps[] };
  }>(GET_EPISODES, {
    variables: { page },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (loading) {
    return <h1>Loading . . .</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const results = data?.episodes.results;
  const info = data?.episodes.info;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#f4f4f4] text-gray-800">
      <header className="bg-[#4ca1af] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures</p>
      </header>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results &&
            results.map(({ id, name, air_date, episode }: EpisodeProps, key: number) => (
              <EpisodeCard
                id={id}
                name={name}
                air_date={air_date}
                episode={episode}
                key={key}
              />
            ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105"
          >
            Next
          </button>
        </div>

        {info && (
          <p className="text-center mt-4 text-gray-600">
            Page {page} of {info.pages} • Total Episodes: {info.count}
          </p>
        )}
      </main>

      <footer>
        <p className="bg-[#4ca1af] text-white py-6 text-center shadow-md">
          &copy; 2025 Rick and Morty Fan Page
        </p>
      </footer>
    </div>
  );
};

export default Home;
