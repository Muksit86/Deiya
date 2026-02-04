import React, { useEffect } from "react";
import axios from "axios";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LuFileImage, LuMenu } from "react-icons/lu";
import ImageNode from "../component/ImageNode";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";

const nodeTypes = { imageNode: ImageNode };

function Board() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState(false);

  const [nodes, setNodes] = useState(() => {
    const stored = localStorage.getItem("nodes");
    return stored ? JSON.parse(stored) : [];
  });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const handleImage = async (e) => {
    setLoading(true);

    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_SERVER}/api/image`,
      formData,
    );

    const newNode = {
      id: `node_${crypto.randomUUID()}`,
      type: "imageNode",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: {
        label: "Image 1",
        imageUrl: data.PublicUrl,
        filePath: data.filePath,
      },
    };

    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      localStorage.setItem("nodes", JSON.stringify(updatedNodes));
      return updatedNodes;
    });
    // allow re-uploading the same file
    e.target.value = "";
    setLoading(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    handleImage({ target: { files: [file] } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [nodes]); //this will save the nodes

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
      >
        <div className="w-screen h-screen relative">
          <div className="absolute z-20 bottom-10 right-10">
            <label
              htmlFor="image-upload"
              className="bg-accent text-black flex-col p-4 rounded-full justify-center hover:bg-accent-hover active:scale-95 scale-100 cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <AiOutlineLoading3Quarters ize={15} className="animate-spin" />
              ) : (
                <LuFileImage size={30} />
              )}
            </label>

            <input
              disabled={loading}
              onChange={handleImage}
              id="image-upload"
              type="file"
              name="image"
              className="hidden"
            />
          </div>

          <div className="absolute z-20 top-10 left-10">
            <label
              onClick={() => setNav(!nav)}
              className="bg-accent text-black flex-col p-2 rounded-full justify-center hover:bg-accent-hover active:scale-95 scale-100 cursor-pointer flex items-center gap-2"
            >
              <LuMenu size={30} />
            </label>
          </div>

          {nav && (
            <div
              className={clsx(
                "absolute z-20 top-10 left-[50%] -translate-x-[50%] origin-center transition-all duration-200 ease-in-out",
              )}
            >
              <nav>
                <div className="flex gap-10 bg-accent text-black px-4 py-2 text-xl">
                  <span
                    onClick={() => navigate("/")}
                    className="cursor-pointer"
                  >
                    home
                  </span>
                  <span
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer"
                  >
                    profile
                  </span>
                  <span
                    onClick={() => navigate("/boards")}
                    className="cursor-pointer"
                  >
                    board
                  </span>
                </div>
              </nav>
            </div>
          )}

          <ReactFlow
            colorMode="dark"
            nodeTypes={nodeTypes}
            nodes={nodes}
            onNodesChange={onNodesChange}
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  );
}

export default Board;
