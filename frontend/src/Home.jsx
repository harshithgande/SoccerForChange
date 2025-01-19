export default function Home() {
  const arrow = (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path
        class="fill-[#FFA726]"
        d="M14.59 13H7a1 1 0 0 1 0-2h7.59l-2.3-2.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l2.3-2.3z"
      ></path>
    </svg>
  );

  return (
    <div className="overflow-x-hidden -mt-24">
      <div className="bg-parallax bg-center bg-cover h-screen sm:bg-fixed">
        <div className="bg-black bg-opacity-55 w-full h-full flex flex-col items-center justify-center gap-6">
          <h1 className="font-bold text-4xl md:text-6xl sm:text-5xl uppercase tracking-wider text-white text-center">
            Soccer for Change
          </h1>
          <h2 className="text-lg md:text-2xl sm:text-xl text-white max-w-[30ch] md:max-w-[65ch] sm:max-w-[45ch] text-center font-thin">
            Empowering the youth through soccer programs that foster teamwork,
            leadership, and personal growth
          </h2>
          <a
            href="/register"
            className="flex items-center px-6 py-2.5 bg-emerald-600 rounded-full mt-4 group cursor-pointer"
          >
            <h3 className="font-semibold uppercase tracking-wide text-[#FFA726]">
              Register Now
            </h3>
            <div className="group-hover:translate-x-1 transition-transform">
              {arrow}
            </div>
          </a>
        </div>
      </div>

      <div className="bg-white h-fit w-screen flex overflow-y-hidden px-8 sm:px-24 py-16 sm:py-32 items-center">
        <div className="flex flex-wrap gap-x-24 gap-y-8 items-center">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
              <hr className="border-4 w-12 border-emerald-600" />
            </div>

            <p className="max-w-[75ch] flex-grow min-text:min-w-0 min-w-[45ch]">
              Our team of hardworking coaches are all current high school
              players who have experienced development at the youth level. With
              their knowledge, they can guide players and help them build
              well-grounded skills, taking them to the next level on their
              soccer journey. Find out more about our nonprofit organization and
              our mission by visiting the{" "}
              <a href="/about" className="text-blue-600">
                About
              </a>{" "}
              page or get started with camp registration on the{" "}
              <a href="/register" className="text-blue-600">
                Registration
              </a>{" "}
              page.
            </p>
          </div>

          <img
            className="flex-1 min-w-72"
            src="Why Choose Us.jpg"
            alt="Soccer for Change"
          ></img>
        </div>
      </div>
    </div>
  );
}
