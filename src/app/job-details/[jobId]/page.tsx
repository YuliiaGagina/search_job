"use client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import useSWR from 'swr';
import axios from "axios";
import Link from "next/link";

interface JobOption {
  publisher: string;
  apply_link: string;
}

interface JobDetails {
  employer_name: string;
  job_title: string;
  job_description: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_is_remote: boolean;
  apply_options: JobOption[]
}

type Props = {
  params: {
    jobId: string;
  };
};

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  });
  return response.data.data[0];
};

export default function JobDetailsForOne ({ params }: Props) {
 
  const [successMessage, setSuccessMessage] = useState<string>("");


    const { data: jobDetails, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL_DETAIL}?job_id=${decodeURIComponent(params.jobId)}`,
    fetcher
  );

 

  const addToFavorites = () => {
    if (jobDetails) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      favorites.push(jobDetails);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setSuccessMessage("The work has been successfully added to favorites");
    }
  };

  return (
    jobDetails && (
      <div className="container py-16 mx-auto">
        <h1 className="underline mb-5 text-2xl">{jobDetails.job_title}</h1>
        <h2 className="mb-5 text-2xl">{jobDetails.employer_name}</h2>
        <p className="mb-5 text-2xl">
          Salary: {jobDetails.job_min_salary} - {jobDetails.job_max_salary}
        </p>
        <p className=" leading-3 mb-5 text-2xl ">
          Remote: {jobDetails.job_is_remote ? "Yes" : "No"}
        </p>
        <p>{jobDetails.job_description}</p>
        <p>Apply options</p>
        <ul className="flex direction-col gap-5">
          {jobDetails.apply_options.map((option  : JobOption ) => (
            <Link
              className="underline"
              key={option.publisher}
              href={option.apply_link}
            >
              {option.publisher}
            </Link>
          ))}
        </ul>

        {successMessage && <p>{successMessage}</p>}
        <button
          className="rounded-md text-white mx-auto bg-orange-300 py-2 px-6 w-64 mb-4"
          onClick={addToFavorites}
        >
          Add to Favorites
        </button>
      </div>
    )
  );
}
