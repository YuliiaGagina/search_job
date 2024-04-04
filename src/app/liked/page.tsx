"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OneJob {
  job_title: string;
  job_id: string;
}

export default function FavoriteJobs() {
  const [favorites, setFavorites] = useState<OneJob[]>([]);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites = (jobTitle: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (job: OneJob) => job.job_title !== jobTitle
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-bold text-3xl text-orange-300">
        Favorite Jobs
      </h1>
      <ul>
        {favorites.map((job: OneJob) => (
          <li
            className="rounded-md container mx-auto py-4 flex mb-16 gap-4 justify-between   py-4 px-4 bg-orange-300 mb-16 items-center"
            key={job.job_title}
          >
            <Link href={`/job-details/${job.job_id}`}>{job.job_title}</Link>
            <button onClick={() => removeFromFavorites(job.job_title)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
