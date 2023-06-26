import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MdOutlineClose, MdViewHeadline } from "react-icons/md";
import { useRouter } from "next/router";
import { RootState } from "<@>/store";
import { useAppDispatch } from "<@>/store/hooks";
import { clearToken } from "<@>/store/auth/auth-slice";
import UserAvatar from "../common/UserAvatar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavDataType {
  student: NavItem[];
  admin: NavItem[];
}
interface NavItem {
  name: string;
  to: string;
  current: boolean;
}
const NavBar: React.FC = () => {
  const navData: NavDataType = {
    student: [
      {
        name: "Home",
        to: "/",
        current: true,
      },
      {
        name: "Contests",
        to: "/contests",
        current: false,
      },
      {
        name: "Your Progress",
        to: "/journey",
        current: false,
      },
    ],
    admin: [
      {
        name: "Groups",
        to: "/groups",
        current: true,
      },
      {
        name: "Contests",
        to: "/contests",
        current: false,
      },
      {
        name: "Announcements",
        to: "/announcements",
        current: false,
      },
      {
        name: "Wait list",
        to: "/wait-list",
        current: false,
      },
    ],
  };
  const { asPath } = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const role = useSelector((state: RootState) => state.auth.role);
  const adminRole = "HeadOfEducation";
  console.log("role", role);

  const [navigation, setNavigation] = useState(() => {
    if (role === adminRole) {
      return navData.admin;
    }
    return navData.student;
  });

  useEffect(() => {
    if (role === adminRole) {
      setNavigation(navData.admin);
    } else {
      setNavigation(navData.student);
    }
  }, [role]);

  const showProfileRef = useRef<HTMLDivElement>(null);
  const showNavRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearToken());
    router.push("/auth/signin");
  };

  useEffect(() => {
    setNavigation(
      navigation!.map((item) => {
        if (item.to === asPath) {
          return { ...item, current: true };
        } else {
          return { ...item, current: false };
        }
      })
    );
  }, [asPath]);

  const auth = useSelector((state: RootState) => state.auth);

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showProfileRef.current &&
        !showProfileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }

      if (
        showNavRef.current &&
        !showNavRef.current.contains(event.target as Node)
      ) {
        setShowNav(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileRef]);

  // handle route change
  useEffect(() => {
    const handleRouteChange = () => {
      setShowNav(false);
      setShowProfile(false);
    };

    // Attach an event listener to the router's 'routeChangeStart' event
    router.events.on("routeChangeStart", handleRouteChange);

    // Remove the event listener when the component is unmounted
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      <section className="flex px-4 py-2 border-b-2 items-center">
        <Link href="/">
          <div className="w-28 lg:w-52">
            <Image src="/a2sv-logo.png" width={105} height={30} alt="logo" />
          </div>
        </Link>

        <div className="w-full absolute -right-0 flex flex-col md:flex-row md:static">
          {/* Navigation Links*/}

          {isAuthenticated && (
            <nav
              className={classNames(
                showNav ? "flex" : "hidden",
                "md:flex absolute md:static right-0 bg-white md:ml-0 shadow-xl md:shadow-none p-10 md:p-0 rounded-xl top-8"
              )}
            >
              <div
                ref={showNavRef}
                className="flex flex-col gap-5 z-20 md:m-0 bg-white content-between md:flex-row md:items-center md:w-full justify-between"
              >
                {navigation!.map(({ name, to, current }, index) => (
                  <Link
                    key={index}
                    href={to}
                    className={classNames(
                      current ? "text-blue-700" : "text-primary-text",
                      "text-sm md:text-base"
                    )}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </nav>
          )}

          {/* Mobile Navigation HumBurger Icon */}

          <div className="flex ml-auto justify-end">
            {isAuthenticated &&
              (showNav ? (
                <MdOutlineClose
                  className="block w-10 h-10 p-2 md:hidden ml-auto"
                  onClick={() => {
                    setShowNav(!showNav);
                    setShowProfile(false);
                  }}
                />
              ) : (
                <MdViewHeadline
                  className="block w-10 h-10 p-2 md:hidden ml-auto"
                  onClick={() => {
                    setShowNav(!showNav);
                    setShowProfile(false);
                  }}
                />
              ))}

            {/* Logged in user profile icon */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNav(false);
                }}
              >
                {auth.profilePicture && auth.profilePicture !== "null" ? (
                  <UserAvatar
                    fullName={auth.fullName!}
                    profilePhotoUrl={auth.profilePicture!}
                  />
                ) : (
                  <UserAvatar fullName={auth.fullName!} profilePhotoUrl="" />
                )}
              </button>
            )}
          </div>

          {isAuthenticated ? (
            <>
              {showProfile && (
                <div
                  className="absolute right-0 z-20 top-16 w-60 border border-r-0 bg-white shadow-2xl text-gray-500"
                  ref={showProfileRef}
                >
                  <div className="text-start p-2">
                    <p className="font-bold">{auth.fullName}</p>
                    <span>{user.email}</span>
                  </div>
                  <div className="border border-y-2 border-x-0 flex flex-col text-sm gap-y-2">
                    <Link href="/profile">
                      <button className="p-2 hover:bg-gray-100 w-full text-start">
                        My Profile
                      </button>
                    </Link>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 w-full text-start"
                    onClick={handleLogout}
                  >
                    Signout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className={classNames(
                showNav || !isAuthenticated ? "flex" : "hidden",
                "ml-auto md:flex items-center space-x-2 text-sm"
              )}
            >
              {/* auth buttons */}
              <Link href="/auth/signin">
                <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none border-blue-400 text-primary hover:scale-110 transition ease-in-out duration-200">
                  Login
                </button>
              </Link>

              <Link href="/auth/signup">
                <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none border-blue-400 bg-primary hover:scale-110 text-white transition ease-in-out duration-200">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NavBar;
