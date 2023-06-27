// in this component I only want to show the button that lead to edit profile page

import { useGetUserapiQuery } from "<@>/store/auth/auth-api";
import { setUser } from "<@>/store/auth/user-slice";
import { useAppDispatch } from "<@>/store/hooks";
import CustomSuccess from "<@>/types/auth/custom-success";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import StudentDetail from "./StudentDetail";
import { useSelector } from "react-redux";
import { RootState } from "<@>/store";
import Redirect from "../common/Redirect";
import ProgrammingHandles from "./ProgrammingHandles";
import {
  SiCodeforces,
  SiGeeksforgeeks,
  SiGithub,
  SiLeetcode,
} from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";
import ProfileCard from "./ProfileCard";
import ProfileLoadingSkeleton from "./ProfileLoadingSkeleton";

const Profile = () => {
  const applicant = useSelector((state: RootState) => state.user.user);

  const programmingSites = [
    {
      platform: "LeetCode",
      handle: applicant?.leetCodeHandle,
      baseUrl: `https://leetcode.com/${applicant?.leetCodeHandle}`,
      icon: SiLeetcode,
    },
    {
      platform: "CodeForces",
      handle: applicant?.codeforcesHandle,
      baseUrl: `https://codeforces.com/profile/${applicant?.gitHubHandle}`,
      icon: SiCodeforces,
    },
    {
      platform: "Github",
      handle: applicant?.gitHubHandle,
      baseUrl: `https://github.com/${applicant?.gitHubHandle}`,
      icon: SiGithub,
    },
    {
      platform: "HackerRank",
      handle: applicant?.hackerrankHandle,
      baseUrl: `https://www.hackerrank.com/${applicant?.hackerrankHandle}`,
      icon: FaHackerrank,
    },
  ];
  // route protection
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useAppDispatch();
  const {
    data = [] as unknown as CustomSuccess,
    isFetching,
    isSuccess,
  } = useGetUserapiQuery("");

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => router.push("/auth/signin"), 2000);
      // Redirect to login page if user is not authenticated
    }
  }, [isAuthenticated, router]);

  if (isFetching) {
    return <ProfileLoadingSkeleton />;
  }
  if (isSuccess) {
    console.log(data);
    dispatch(setUser(data.value));
  }

  if (!isAuthenticated) {
    return <Redirect />;
  }

  return (
    <section className="bg-[#F6F6FC]">
      <h1 className="ml-28 py-8 text-xl md:text-2xl text-gray-500 font-bold font-sans">
        Profile
      </h1>

      <div className="grid grid-cols-1 items-start md:grid-cols-6 md:p-4 xl:px-20 space-y-6 md:space-y-0 lg:space-x-6 mx-2">
        <div className="flex flex-col gap-5 justify-center items-center  md:col-span-3 xl:col-span-2">
          <ProfileCard />
          <div className="w-96 mx-2">
            <h1 className="font-light font-sans uppercase whitespace-nowrap p-6 bg-white">
              Programming site handles
            </h1>
            <div className="space-y-2 max-w-md rounded overflow-hidden shadow-lg p-10 align-top bg-white">
              {programmingSites.map((item, index) => {
                return item.handle ? (
                  <ProgrammingHandles key={index} {...item} />
                ) : null;
              })}
            </div>
          </div>
        </div>

        <StudentDetail />
      </div>
    </section>
  );
};

export default Profile;
