import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="carousel w-full h-[85vh]">
      {/* SLIDE 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div className="w-full bg-gradient-to-r from-black via-gray-900 to-black flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Turn Startup Ideas Into Reality
              </h1>

              <p className="text-gray-300 text-lg">
                Share innovative concepts, discover trending startups, and
                collaborate with creative minds around the world.
              </p>

              <Link
                to="/ideas"
                className="inline-block bg-blue-600 hover:bg-blue-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Explore Ideas
              </Link>
            </div>

            <div>
              <img
                src="https://i.ibb.co/JqgJQ8D/startup1.jpg"
                alt="startup"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>

          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* SLIDE 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div className="w-full bg-gradient-to-r from-blue-950 via-black to-black flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Discover The Next Big Innovation.
              </h1>

              <p className="text-gray-300 text-lg">
                Explore trending ideas in AI, Health, Education, and Tech shared
                by passionate innovators.
              </p>

              <Link
                to="/ideas"
                className="inline-block bg-blue-600 hover:bg-blue-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Explore Ideas
              </Link>
            </div>

            <div>
              <img
                src="https://i.ibb.co/2kR7dYQ/startup2.jpg"
                alt="innovation"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>

          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* SLIDE 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div className="w-full bg-gradient-to-r from-gray-950 via-black to-blue-950 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Collaborate & Grow Together
              </h1>

              <p className="text-gray-300 text-lg">
                Connect with entrepreneurs, get valuable feedback, and refine
                your startup ideas.
              </p>

              <Link
                to="/ideas"
                className="inline-block bg-blue-600 hover:bg-blue-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Explore Ideas-
              </Link>
            </div>

            <div>
              <img
                src="https://i.ibb.co/fYwL0Wn/startup3.jpg"
                alt="teamwork"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>

          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
