import React from "react";
import { SiCodeforces, SiGithub, SiLeetcode, SiTelegram } from "react-icons/si";
import {
  FaGraduationCap,
  FaHackerrank,
  FaLinkedin,
  FaPhone,
  FaSchool,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ProgrammingHandles from "./ProgrammingHandles";
import Image from "next/image";
import User from "<@>/types/auth/user";
import BasicInfoCard from "./BasicInfoCard";
import { useGetUserDetailQuery } from "<@>/store/profile/user-detail-api";
import Loading from "../common/Loading";
import FetchingError from "../common/FetchingError";

interface StudentDetailProps {
  userId: string;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ userId }) => {
  const { data, isLoading, error } = useGetUserDetailQuery({ userId });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <FetchingError />;
  }

  const applicant: User | undefined = data?.value;

  const basicInfos = [
    {
      data: applicant?.telegramUsername,
      link: `https://t.me/${applicant?.telegramUsername}`,
      icon: SiTelegram,
    },
    {
      data: applicant?.email,
      icon: MdEmail,
      link: `mailto:${applicant?.email}`,
    },
    {
      data: applicant?.phoneNumber,
      icon: FaPhone,
      link: `tel:${applicant?.phoneNumber}`,
    },
    {
      data: applicant?.linkedInHandle,
      icon: FaLinkedin,
      link: `https://www.linkedin.com/in/${applicant?.linkedInHandle}`,
    },
    {
      data: applicant?.university,
      icon: FaSchool,
    },
    {
      data:
        applicant?.department || applicant?.graduationYear
          ? `${applicant?.department || "Unknown"}  | ${
              applicant?.graduationYear
            }` || "Unknown"
          : null,
      icon: FaGraduationCap,
    },
  ];

  const programmingSites = [
    {
      platform: "LeetCode",
      handle: applicant?.leetCodeHandle,
      link: `https://leetcode.com/${applicant?.leetCodeHandle}`,
      icon: SiLeetcode,
    },
    {
      platform: "CodeForces",
      handle: applicant?.codeforcesHandle,
      link: `https://codeforces.com/profile/${applicant?.codeforcesHandle}`,
      icon: SiCodeforces,
    },
    {
      platform: "GitHub",
      handle: applicant?.gitHubHandle,
      link: `https://github.com/${applicant?.gitHubHandle}`,
      icon: SiGithub,
    },
    {
      platform: "HackerRank",
      handle: applicant?.hackerrankHandle,
      link: `https://www.hackerrank.com/${applicant?.hackerrankHandle}`,
      icon: FaHackerrank,
    },
  ];

  return (
    <>
      <div className="flex w-full p-6 mt-2 font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
        <h3 className="whitespace-nowrap">Personal info</h3>
        <div className="w-full">
          <hr />
        </div>
      </div>
      <div className="px-8">
        <div className="flex w-full border border-gray-100 p-4 rounded space-x-4 my-4">
          {applicant?.profilePicture ? (
            <Image
              width={640}
              height={640}
              className="rounded-xl bg-gray-100 w-32 h-32 object-cover"
              src={applicant?.profilePicture}
              alt={applicant?.fullName + " avatar"}
            />
          ) : (
            <div className="rounded-xl flex items-center justify-center text-gray-400 text-sm bg-gray-100 w-32 h-32">
              No Photo
            </div>
          )}

          <div>
            <h2 className="text-xl font-medium mb-2">{applicant?.fullName}</h2>
            <p className="text-gray-500">{applicant?.shortBio}</p>
          </div>
        </div>

        <div className="border border-gray-100 rounded px-6 py-4">
          <h3 className="mb-4 font-medium text-gray-500">Basic Info</h3>
          <div className="grid grid-cols-3 pb-3">
            {basicInfos.map((info, index) => {
              if (info.data) {
                return (
                  <BasicInfoCard
                    key={index}
                    data={info.data}
                    link={info.link}
                    icon={info.icon}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className="border border-gray-100 px-6 py-3 mt-4">
          <div>
            <h3 className="mb-4 font-medium text-gray-500">
              Developer Handles
            </h3>
            <div className="grid grid-cols-4 gap-x-4 pb-3">
              {programmingSites.map((site, index) => {
                if (site.handle) {
                  return (
                    <ProgrammingHandles
                      key={index}
                      platform={site.platform}
                      link={site.link}
                      handle={site.handle}
                      icon={site.icon}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetail;
