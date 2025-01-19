import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function About() {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.soccerforchange.org:444/api/team")
      .then((response) => {
        setTeam(response.data);
      });
  }, []);

  const arrow = (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path
        class="fill-emerald-600"
        d="M14.59 13H7a1 1 0 0 1 0-2h7.59l-2.3-2.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l2.3-2.3z"
      ></path>
    </svg>
  );

  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="md:px-24 sm:px-16 px-8 py-12 flex flex-col items-start gap-10">
          <div className="flex flex-col gap-2">
            <h4 className="uppercase tracking-wider font-bold text-emerald-600 text-sm">
              Our Story
            </h4>
            <h1 className="text-4xl font-semibold text-gray-800">
              About Soccer for Change
            </h1>
          </div>

          <div className="flex lg:flex-row flex-col justify-center gap-10">
            <div className="flex flex-col gap-4 min-text:min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-emerald-600">
                Who we are
              </h2>
              <p>
                Soccer For Change is a 501(c)(3) nonprofit organization founded
                by high school students Vedanth Rao and Adel Dekhani looking to
                encourage the development of soccer in youth, along with all the
                positive benefits the sport promotes. We believe that we can not
                only boost skills, but also build important values such as
                confidence, teamwork, and leadership.
              </p>
            </div>
            <div className="h-auto w-0.5 rounded-full bg-gray-200 hidden lg:block" />
            <div className="flex flex-col gap-4 min-text:min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-emerald-600">
                What we do
              </h2>
              <p>
                At Soccer For Change, we believe that sports can be a powerful
                tool for personal growth and development. Our nonprofit
                organization provides accessible coaching through reduced costs.
                Our high school coaching staff has experience going through the
                young player pathway and knows what it takes to thrive as an
                elite soccer player. Your child will learn the skills they need
                to advance as a young player and build confidence all while
                gaining a newfound passion for the sport.
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-72 bg-about bg-cover bg-top-50 saturate-25">
          <div className="absolute inset-0 bg-emerald-600 opacity-90 mix-blend-multiply z-0 saturate-150"></div>

          <div className="relative h-full w-full lg:p-24 md:p-16 p-8 flex flex-col gap-1 justify-center z-10 text-3xl sm:text-4xl">
            <h1 className="font-bold text-white">Our mission is to:</h1>
            <h1 className="text-amber-500 font-bold saturate-200">
              Empower youth through soccer
            </h1>
          </div>
        </div>
        <div className="min-h-screen md:px-24 sm:px-16 px-8 flex flex-col gap-10 bg-gray-100 -mt-16 pt-24 pb-32">
          <div className="flex flex-col gap-2">
            <h4 className="uppercase tracking-wider font-bold text-emerald-600 text-sm">
              Leadership
            </h4>
            <h1 className="text-4xl font-semibold text-gray-800">
              Meet the team
            </h1>
          </div>

          <div
            class="grid gap-10 auto-cols-fr z-30 "
            style={{
              "grid-template-columns": "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {!team || team["members"].length === 0 ? (
              <p>No data found.</p>
            ) : (
              team["members"].map((person, index) => (
                <AboutCard key={index} {...person} />
              ))
            )}
          </div>

          <div className="flex flex-col gap-6 pt-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-semibold text-gray-800">
                  Interested in joining?
                </h1>
                <hr className="border-4 w-12 border-emerald-600" />
              </div>
              <p className="max-w-[75ch]">
                We are always looking for passionate and dedicated coaches to
                join our team. If you love soccer and want to make a difference
                in the lives of young people, we want to hear from you! Check
                out our current job openings and submit your application today.
              </p>
            </div>

            <a
              href="/apply"
              className="w-fit rounded px-4 py-2 border-2 flex items-center border-emerald-600 text-emerald-600"
            >
              <h3 className="font-semibold uppercase tracking-wider text-sm">
                Apply Now
              </h3>
              {arrow}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function AboutCard({ name, position, bio, image }) {
  return (
    <div className="flex flex-col p-8 bg-white shadow-md rounded-lg gap-2 max-w-80 h-fit">
      <img
        className="object-cover object-top h-64 rounded-t-lg"
        src={`https://api.soccerforchange.org:444${image}`}
      />
      <div>
        <h2 className="font-semibold text-2xl">{name}</h2>
        <h3 className="text-amber-500 uppercase font-semibold text-xs tracking-wider">
          {position}
        </h3>
      </div>

      <p className="w-auto">{bio}</p>
    </div>
  );
}
