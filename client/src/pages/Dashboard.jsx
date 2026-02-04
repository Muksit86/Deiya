import React from "react";
import axios from "axios";

function dashboard({}) {
  return (
    <>
      <div className="border flex flex-col">
        <form>
          <input type="file" name="image" id="" />
          <button type="submit" className="bg-gray-500 text-black">
            get
          </button>
        </form>
      </div>
    </>
  );
}

export default dashboard;
