"use client";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Job from "../../assets/job.jpg";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface JobData {
  employer_name: string;
  employer_logo: string;
  employer_website: string | null;
  employer_company_type: string;
  job_publisher: string;
  job_id: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_apply_is_direct: boolean;
  job_apply_quality_score: number;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: null;
  job_google_link: string;
  job_offer_expiration_datetime_utc: string;
  job_offer_expiration_timestamp: number;
  job_required_experience: string;
  job_required_skills: null;
  job_required_education: string;
  job_experience_in_place_of_education: boolean;
  job_min_salary: null;
  job_max_salary: null;
  job_salary_currency: null;
  job_salary_period: null;
  job_highlights: null;
  job_job_title: null;
  job_posting_language: string;
  job_onet_soc: string;
  job_onet_job_zone: string;
  job_naics_code: string;
  job_naics_name: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  });
  return response.data.data;
};

export default function Jobs() {
  const router = useRouter();

  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfession(e.target.value);
  };

  const { data: jobs, error, mutate } = useSWR(
    profession ? `${process.env.NEXT_PUBLIC_API_URL}?query=${profession}` : null,
    fetcher
  );

    

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { desiredJob } = JSON.parse(userData);
      if (desiredJob) {
        setProfession(desiredJob);

       setCurrentPage(1);
    mutate();
        router.push(`/jobs?profession=${desiredJob}`);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 setCurrentPage(1);
    mutate();
    router.push(`/jobs?profession=${profession}`);
  };

  

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    mutate();
  };

  const handlePrevPage = () => {
       if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      mutate(); 
    }
  };

  return (
    <div className="py-24">
      <form
        className="flex gap-8 align-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="block w-56  bg-gray-100 bg-opacity-50 rounded-md h-12 pl-2 border-0  text-gray-900 ring-1 ring-inset  placeholder:text-gray placeholder:pl-4 focus:ring-2 ring-gray-10 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6 "
          type="text"
          value={profession}
          onChange={handleInputChange}
          placeholder="Enter profession"
        />
        <button
          className="w-64 h-12  text-center rounded-md text-white  bg-orange-300 py-2 px-6 mb-4"
          type="submit"
        >
          Search
        </button>
      </form>

      {!loading && jobs.length === 0 && <div>No jobs found</div>}
      {jobs && (
        <div>
          <ul className="flex gap-5 container:lg mx-auto flex-wrap   mb-9  ">
            {jobs.map((job :JobData , index : string) => (
              <li className="ease-in-out duration-500" key={index}>
                <div className="shadow-lg w-64 h-52 overflow-hidden rounded-md flex-column flex-wrap justify-center   relative">
                  {job.employer_logo ? (
                    <img
                      className="w-full h-full hover:scale-125 ease-in-out duration-500   rounded-md shadow-xl shadow-cyan-500/50 block"
                      width={100}
                      height={100}
                      src={job.employer_logo }
                      alt={job.employer_name}
                    />
                  ) : (
                    <Image
                      className="w-full h-full hover:scale-125 ease-in-out duration-500   rounded-md shadow-xl shadow-cyan-500/50 block"
                      width={100}
                      height={100}
                      src={Job}
                      alt="photo"
                    />
                  )}
                  <p>{job.job_min_salary}</p>
                  <h3 className="bg-red-300  py-1 w-64  text-center text-l font-semibold text-gray-90 rounded-md relative bottom-16 px-4">
                    {job.job_title}
                  </h3>
                </div>
                <Link
                  className="bg-green-300 w-full rounded-lg px-4 py-1 relative "
                  href={`/job-details/${encodeURIComponent(job.job_id)}`}
                >
                  Подробнее
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {jobs && (
        <div className="bg-slate-100 w-48 gap-2  mx-auto flex justify-center items-center py-2 px-2 rounded-full">
          <button
            className="page-item py-1 px-2 border border-2 bg-gray-200  rounded-full border-gray-400 flex items-center justify-center"
            onClick={handlePrevPage}
          >
            prev
          </button>
          <span>
            {" "}
            {currentPage} of {totalPages}
          </span>
          <button
            className="page-item py-1 px-2 border border-2 bg-gray-200  rounded-full border-gray-400 flex items-center justify-center"
            onClick={handleNextPage}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}
