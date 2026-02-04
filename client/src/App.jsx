import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Background,
  ReactFlow,
  applyNodeChanges,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { data, useNavigate } from "react-router";
import heroImage1 from "./assets/hero-image-1.webp";
import heroImage2 from "./assets/hero-image-2.webp";
import ImageNode from "./component/ImageNode";
import { createClient } from "@supabase/supabase-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";
import { supabase } from "./utilitis/supabaseClient";
import {
  FaBolt,
  FaLock,
  FaBox,
  FaCode,
  FaPalette,
  FaGraduationCap,
  FaLightbulb,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const nodeTypes = { imageNode: ImageNode };
const url = import.meta.env.VITE_API_SERVER;

function App() {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);

  const [nodes, setNodes] = useState([
    {
      id: "n1",
      type: "imageNode",
      data: {
        label: "Image 1",
        imageUrl: heroImage1,
      },
      position: { x: 100, y: 100 },
    },
    {
      id: "n2",
      type: "imageNode",
      data: {
        label: "Image 2",
        imageUrl: heroImage2,
      },
      position: { x: 200, y: 200 },
    },
  ]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/board");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [email, setEmail] = useState("");
  const handleEmailSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]{2,}@[A-Z0-9.-]{2,}\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const { error } = await supabase.from("emails").insert([{ email }]);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Email saved");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const useCases = [
    {
      label: "Reference Board",
      content: "Collect links, notes, and ideas in one place.",
    },
    {
      label: "Idea Dump",
      content: "Quickly capture thoughts without structure.",
    },
    {
      label: "Learning Aid",
      content: "Store definitions, examples, and explanations.",
    },
    {
      label: "Planning",
      content: "Map simple flows or steps visually.",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between items-center">
        <header className="flex flex-col items-center justify-center gap-16 py-10 w-full">
          <nav className="border-2 border-black flex flex-wrap items-center justify-center gap-15 md:gap-8 lg:gap-20 md:px-8 md:py-4 px-4 py-2 relative">
            <h1 className="hidden md:block font-bold font-roboto-mono text-2xl md:text-xl">
              Deiya
            </h1>

            <div className="md:hidden block">
              <button onClick={() => setMenu(!menu)}>
                <MdOutlineMenu size={35} />
              </button>
            </div>

            <div className="hidden md:flex gap-30">
              <span
                onClick={() => scrollToSection("value-snapshot")}
                className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
              >
                Features
              </span>
              <span
                onClick={() => scrollToSection("who-its-for")}
                className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
              >
                Who It's For
              </span>
              <span
                onClick={() => scrollToSection("howItWorks")}
                className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
              >
                How it Works
              </span>
              <span
                onClick={() => scrollToSection("privacy-details")}
                className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
              >
                Privacy
              </span>
            </div>

            <button
              onClick={handleNavigation}
              className="bg-secondary text-white cursor-pointer px-3 md:px-5 py-2 md:py-3 text-2xl md:text-xl font-roboto-mono font-semibold transition-all"
            >
              <span>Open App</span>
            </button>

            {menu && (
              <div className="md:hidden flex flex-col absolute top-18 gap-7 w-full bg-white border-2 border-black p-4 font-semibold">
                <span
                  onClick={() => scrollToSection("value-snapshot")}
                  className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
                >
                  Features
                </span>
                <span
                  onClick={() => scrollToSection("who-its-for")}
                  className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
                >
                  Who It's For
                </span>
                <span
                  onClick={() => scrollToSection("howItWorks")}
                  className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
                >
                  How it Works
                </span>
                <span
                  onClick={() => scrollToSection("privacy-details")}
                  className="cursor-pointer font-roboto-mono text-xs md:text-base hover:text-secondary transition-colors"
                >
                  Privacy
                </span>
              </div>
            )}
          </nav>

          <main className="flex justify-center items-center gap-8 flex-col flex-1 px-4">
            <div className="w-full md:w-10/12 lg:w-9/12 text-center">
              <h1 className="text-4xl md:text-7xl lg:text-9xl font-roboto-serif mb-4">
                Manage your reference in Web
              </h1>
              <p className="text-base md:text-xl font-roboto-mono">
                use Deiya to manage and organize your refernce images properly
              </p>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-4 items-center w-full md:w-auto px-4">
              <button
                onClick={handleNavigation}
                className="bg-secondary cursor-pointer px-5 py-3 text-lg md:text-xl font-roboto-mono font-semibold transition-all w-full md:w-auto text-white"
              >
                <span>Open App</span>
              </button>
              <form onSubmit={handleEmailSubmit} className="w-full md:w-auto">
                <div className="flex border border-black w-full">
                  <div className="px-3 md:px-5 py-3 flex-1">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-base md:text-xl font-roboto-mono focus:outline-none w-full"
                      placeholder="Join the wishlist"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                  <button
                    className="bg-accent hover:bg-accent text-black px-4 cursor-pointer font-semibold font-roboto-mono hover:opacity-90 transition-opacity"
                    type="submit"
                  >
                    {loading ? (
                      <span>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      </span>
                    ) : (
                      <span>Join</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </header>

        {/* Value Snapshot Section */}
        <section
          id="value-snapshot"
          className="py-16 md:py-24 px-4 w-full max-w-7xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-roboto-serif mb-4">
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-lg md:text-2xl font-roboto-mono text-gray-600">
              A lightweight reference tool that runs entirely in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="border-2 border-black p-6 md:p-8 hover:bg-accent hover:bg-opacity-10 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <FaBolt className="text-3xl md:text-4xl text-accent" />
                <h3 className="text-2xl md:text-3xl font-roboto-serif">
                  Instant
                </h3>
              </div>
              <p className="font-roboto-mono text-base md:text-lg">
                No sign-up, no waiting. Open and start using.
              </p>
            </div>

            <div className="border-2 border-black p-6 md:p-8 hover:bg-accent hover:bg-opacity-10 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <FaLock className="text-3xl md:text-4xl text-accent" />
                <h3 className="text-2xl md:text-3xl font-roboto-serif">
                  Private
                </h3>
              </div>
              <p className="font-roboto-mono text-base md:text-lg">
                Your data never leaves your device.
              </p>
            </div>

            <div className="border-2 border-black p-6 md:p-8 hover:bg-accent hover:bg-opacity-10 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <FaBox className="text-3xl md:text-4xl text-accent" />
                <h3 className="text-2xl md:text-3xl font-roboto-serif">
                  Self-contained
                </h3>
              </div>
              <p className="font-roboto-mono text-base md:text-lg">
                Runs fully on localStorage.
              </p>
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section
          id="who-its-for"
          className="py-16 md:py-24 px-4 w-full max-w-7xl flex flex-col justify-center items-center bg-gray-50"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-roboto-serif mb-4">
              Built for people like
            </h2>
          </div>

          <div>
            <div className="flex flex-col justify-center gap-2 items-center bg-white border-2 border-black p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <FaCode className="text-2xl text-secondary" />
                <h3 className="text-xl md:text-2xl font-roboto-serif">
                  Artists or Designers
                </h3>
              </div>
              <p className="font-roboto-mono text-sm md:text-base">
                who wanted to quickly store references
              </p>
            </div>
          </div>
        </section>

        <section id="howItWorks" className="py-16 md:py-24 w-full">
          <h1 className="text-4xl font-roboto-serif text-center mb-4">
            How it Works
          </h1>
          <div className="w-full h-96 md:h-150">
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              colorMode="dark"
              nodeTypes={nodeTypes}
            >
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </section>

        {/* No Account Explainer Section */}
        <section
          id="no-account-explainer"
          className="py-16 md:py-24 px-4 w-full max-w-7xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-roboto-serif mb-4">
              Why there's no login
            </h2>
            <p className="text-lg md:text-2xl font-roboto-mono text-gray-600">
              ⚠️ Because this app right now is in beta mode.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="w-4/12 mx-auto border-2 border-black p-6 md:p-8 bg-secondary bg-opacity-10">
              <h3 className="text-white text-2xl md:text-3xl font-roboto-serif mb-6">
                Deiya
              </h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-300 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    No sign-up
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-300 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    Stored in localStorage
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-300 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    Works offline
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-300 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    Instant access
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Beta Limitations Section */}
        <section
          id="beta-limitations"
          className="py-16 md:py-24 px-4 w-full max-w-7xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-roboto-serif mb-4">
              Beta version limitations
            </h2>
            <p className="text-lg md:text-2xl font-roboto-mono text-gray-600">
              Simple today. Smarter tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-black p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-roboto-serif mb-6 text-green-600">
                What's Available
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    Works offline
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    Fast load time
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    No account needed
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg">
                    Local data storage
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-black p-6 md:p-8 bg-gray-50">
              <h3 className="text-2xl md:text-3xl font-roboto-serif mb-6 text-gray-600">
                Not Available Yet
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaTimesCircle className="text-gray-400 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg text-gray-600">
                    Cloud sync
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaTimesCircle className="text-gray-400 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg text-gray-600">
                    Cross-device access
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaTimesCircle className="text-gray-400 text-xl mt-1 shrink-0" />
                  <span className="font-roboto-mono text-base md:text-lg text-gray-600">
                    Team collaboration
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy Details Section */}
        <section
          id="privacy-details"
          className="py-16 md:py-24 px-4 w-full max-w-7xl bg-gray-50"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-roboto-serif mb-4">
              Your data, your control
            </h2>
            <p className="text-lg md:text-2xl font-roboto-mono text-gray-600">
              No tracking. No analytics abuse.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-black p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-roboto-serif mb-3">
                Where is data stored?
              </h3>
              <p className="font-roboto-mono text-base md:text-lg">
                Directly in your browser using localStorage.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-roboto-serif mb-3">
                Do you track usage?
              </h3>
              <p className="font-roboto-mono text-base md:text-lg">
                No personal data is collected.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-roboto-serif mb-3">
                What happens if I clear browser data?
              </h3>
              <p className="font-roboto-mono text-base md:text-lg">
                Your saved references will be removed.
              </p>
            </div>
          </div>
        </section>

        {/* Soft CTA Section */}
        <section
          id="soft-cta"
          className="py-16 md:py-24 px-4 w-full max-w-7xl text-center"
        >
          <h2 className="text-4xl md:text-6xl font-roboto-serif mb-4">
            Try it. Break it. Tell us.
          </h2>
          <p className="text-lg md:text-2xl font-roboto-mono text-gray-600 mb-8">
            This is a beta — your feedback shapes what comes next.
          </p>
          <button
            onClick={handleNavigation}
            className="bg-accent hover:bg-accent-hover cursor-pointer px-8 md:px-12 py-4 md:py-5 text-xl md:text-2xl font-roboto-mono font-semibold transition-all border-2 border-black"
          >
            <span>Start using Deiya</span>
          </button>
        </section>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
