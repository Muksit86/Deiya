import { useReactFlow } from "@xyflow/react";
import axios from "axios";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { LuLoaderCircle } from "react-icons/lu";

function ImageNode({ data, id }) {
  const [loaded, setLoaded] = useState(false);
  const { setNodes } = useReactFlow();

  const handleDeleteNode = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_SERVER}/api/image/delete`,
        {
          params: {
            filePath: data.filePath,
          },
        },
      );

      setNodes((nodes) => nodes.filter((n) => n.id !== id));
    } catch (error) {
      console.log("Deleting image: ", error);
    }
  };

  return (
    <>
      <div className="text-white">
        <div className="w-full flex justify-end px-1 mb-1 items-center z-20">
          <button
            onClick={handleDeleteNode}
            className="cursor-pointer hover:bg-hover-2 p-1 rounded-xs"
          >
            <ImCross size={13} className="text-red-300" />
          </button>
        </div>

        {!loaded && (
          <div className="relaive w-100 h-100 bg-gray-700">
            <LuLoaderCircle
              size={90}
              className="top-[50%] left-[50%]  -translate-x-[50%]  -translate-y-[50%] absolute animate-spin"
            />
          </div>
        )}

        <img
          onLoad={() => setLoaded(true)}
          className={`${loaded ? "block" : "hidden"} w-full`}
          src={data.imageUrl}
        />
      </div>
    </>
  );
}

export default ImageNode;
