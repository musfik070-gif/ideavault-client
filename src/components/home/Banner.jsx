import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { FiCpu, FiUsers } from "react-icons/fi";

const Banner = () => {
  return (
    <div className="carousel w-full h-[85vh]">
      {/* SLIDE 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div className="w-full bg-gradient-to-r from-black via-gray-900 to-black flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center w-full">
            <div className="space-y-6 text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Turn Startup Ideas Into Reality
              </h1>

              <p className="text-gray-300 text-lg">
                Share innovative concepts, discover trending startups, and
                collaborate with creative minds around the world.
              </p>

              <Link
                to="/ideas"
                className="inline-block bg-blue-600 hover:bg-blue-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20"
              >
                Explore Ideas
              </Link>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent border border-violet-500/25 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-violet-600/25 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-indigo-600/20 blur-3xl"></div>
                <div className="relative text-center space-y-6 z-10">
                  <div className="inline-flex p-6 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl text-white shadow-xl shadow-violet-500/30 transform hover:scale-110 duration-300">
                    <FaRocket className="text-6xl animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-violet-500 rounded-full mx-auto"></div>
                    <p className="text-violet-300 font-mono text-sm tracking-widest uppercase">Launch Your Concept</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle bg-gray-900/50 text-white hover:bg-gray-800 border-none">
            ❮
          </a>

          <a href="#slide2" className="btn btn-circle bg-gray-900/50 text-white hover:bg-gray-800 border-none">
            ❯
          </a>
        </div>
      </div>

      {/* SLIDE 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div className="w-full bg-gradient-to-r from-blue-950 via-black to-black flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center w-full">
            <div className="space-y-6 text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Discover The Next Big Innovation.
              </h1>

              <p className="text-gray-300 text-lg">
                Explore trending ideas in AI, Health, Education, and Tech shared
                by passionate innovators.
              </p>

              <Link
                to="/ideas"
                className="inline-block bg-blue-600 hover:bg-blue-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20"
              >
                Explore Ideas
              </Link>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-amber-600/20 via-orange-600/10 to-transparent border border-amber-500/25 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-amber-600/25 blur-2xl animate-pulse"></div>
                <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-orange-600/20 blur-3xl"></div>
                <div className="relative text-center space-y-6 z-10">
                  <div className="inline-flex p-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl text-white shadow-xl shadow-amber-500/30 transform hover:scale-110 duration-300">
                    <FiCpu className="text-6xl" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-amber-500 rounded-full mx-auto"></div>
                    <p className="text-amber-300 font-mono text-sm tracking-widest uppercase">AI & Tech Innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle bg-gray-900/50 text-white hover:bg-gray-800 border-none">
            ❮
          </a>

          <a href="#slide3" className="btn btn-circle bg-gray-900/50 text-white hover:bg-gray-800 border-none">
            ❯
          </a>
        </div>
      </div>

      {/* SLIDE 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div className="w-full bg-gradient-to-r from-gray-950 via-black to-blue-950 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center w-full">
            <div className="space-y-6 text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Collaborate & Grow Together
              </h1>

              <p className="text-gray-300 text-lg">
                Connect with entrepreneurs, get valuable feedback, and refine
                your startup ideas.
              </p>

              <Link
                to="/ideas"
                className="inline-block bg-blue-600 hover:bg-blue-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20"
              >
                Explore Ideas
              </Link>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-transparent border border-blue-500/25 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-blue-600/25 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-cyan-600/20 blur-3xl"></div>
                <div className="relative text-center space-y-6 z-10">
                  <div className="inline-flex p-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl text-white shadow-xl shadow-blue-500/30 transform hover:scale-110 duration-300">
                    <FiUsers className="text-6xl" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-blue-500 rounded-full mx-auto"></div>
                    <p className="text-blue-300 font-mono text-sm tracking-widest uppercase">Collaborate & Scale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle bg-gray-900/50 text-white hover:bg-gray-800 border-none">
            ❮
          </a>

          <a href="#slide1" className="btn btn-circle bg-gray-900/50 text-white hover:bg-gray-800 border-none">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
