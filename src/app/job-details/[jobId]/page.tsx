"use client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface JobDetails {
  employer_name: string;
  job_title: string;
  job_description: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_is_remote: boolean;
  apply_options: Array<{ publisher: string; apply_link: string }>;
}

type Props = {
  params: {
    jobId: string;
  };
};

export default function JobDetailsForOne({ params }: Props) {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  console.log(jobDetails);
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          "https://jsearch.p.rapidapi.com/job-details",
          {
            params: {
              job_id: decodeURIComponent(params.jobId),
              extended_publisher_details: "false",
            },
            headers: {
              "X-RapidAPI-Key":
                "7a63ed2dabmshe05a7253b70db32p16f46bjsn25c8952e5abc",
              "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            },
          }
        );
        console.log(response.data.data[0]);

        setJobDetails(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobDetails();
  }, [params.jobId]);

  if (parseInt(params.jobId) > 1000) {
    notFound();
  }

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
          {jobDetails.apply_options.map((option) => (
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
