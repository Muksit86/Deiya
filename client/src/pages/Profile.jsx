import React from "react";
import ComingSoon from "../assets/coming_soon.gif";
import { Link } from "react-router";

function Profile() {
  return (
    <>
      <div className="w-screen h-screen m-0 flex justify-center items-center flex-col gap-6">
        <img src={ComingSoon} />
        <div className="flex items-center flex-col gap-20">
          <h1 className="text-5xl">Coming Soon</h1>
          <Link
            className="w-fit bg-accent px-3 py-2 font-extrabold text-2xl"
            to="/"
          >
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;
