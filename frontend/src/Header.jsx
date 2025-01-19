import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function NavItem({ to, name }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div className="w-fit">
          <span className={isActive ? "text-emerald-600" : "text-gray-200"}>
            {name}
          </span>
          {isActive && (
            <div className="bg-emerald-600 w-auto h-0.5 rounded-full" />
          )}
        </div>
      )}
    </NavLink>
  );
}

export default function Header() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const location = useLocation();
  const [expand, setExpand] = useState(false);

  const menu = (
    <path
      class="secondary"
      fill-rule="evenodd"
      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
    ></path>
  );

  const x = (
    <path
      class="secondary"
      fillRule="evenodd"
      d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
    ></path>
  );

  const house = (
    <>
      <path
        class="primary"
        d="M9 22H5a1 1 0 0 1-1-1V11l8-8 8 8v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1zm3-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      ></path>
      <path
        class="secondary"
        d="M12.01 4.42l-8.3 8.3a1 1 0 1 1-1.42-1.41l9.02-9.02a1 1 0 0 1 1.41 0l8.99 9.02a1 1 0 0 1-1.42 1.41l-8.28-8.3z"
      ></path>
    </>
  );

  const register = (
    <>
      <path
        class="primary"
        d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"
      ></path>
      <rect width="20" height="2" x="2" y="20" class="secondary" rx="1"></rect>
    </>
  );

  const about = (
    <>
      <path class="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
      <path
        class="secondary"
        d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"
      ></path>
    </>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 h-24 transition-all duration-500 flex flex-col items-end z-50">
      <div
        className={`flex ${
          isTopOfPage && location.pathname == "/" && !expand
            ? "bg-transparent"
            : "bg-white shadow-md"
        } min-h-24 px-8 sm:px-12 w-screen sticky top-0 z-50 items-center justify-between transition-all duration-500`}
      >
        <div className="flex items-center gap-4">
          <img
            className="h-10"
            src={
              isTopOfPage && location.pathname == "/" && !expand
                ? "graysoccer4change.png"
                : "greensoccer4change.png"
            }
          ></img>
          <h2
            className={`uppercase font-bold tracking-wider ${
              isTopOfPage && location.pathname == "/" && !expand
                ? "text-gray-200"
                : "text-emerald-600"
            }`}
          >
            Soccer for Change
          </h2>
        </div>
        <nav className="sm:flex gap-12 text-lg font-semibold hidden">
          <NavItem to="/" name="Home" />
          <NavItem to="/register" name="Register" />
          <NavItem to="/about" name="About" />
        </nav>
        <button className="sm:hidden block" onClick={() => setExpand(!expand)}>
          <svg
            className={`${expand ? "w-8 h-8" : "w-6 h-6"} ${
              isTopOfPage && location.pathname == "/" && !expand
                ? "fill-gray-200"
                : "fill-emerald-600"
            }`}
            viewBox="0 0 24 24"
          >
            {expand ? x : menu}
          </svg>
        </button>
      </div>

      {expand && (
        <div className="flex flex-col items-start w-fit bg-white border-separate rounded-bl-xl z-20">
          <MobileNav
            to="/"
            name="Home"
            disableClick={() => setExpand(false)}
            icon={house}
          />
          <MobileNav
            to="/register"
            name="Register"
            disableClick={() => setExpand(false)}
            icon={register}
          />
          <MobileNav
            to="/about"
            name="About"
            disableClick={() => setExpand(false)}
            icon={about}
          />
        </div>
      )}

      {expand && (
        <div className="w-screen h-screen fixed top-0 bg-black bg-opacity-45 z-10"></div>
      )}
    </div>
  );
}

function MobileNav({ to, name, disableClick, icon }) {
  return (
    <NavLink to={to} onClick={disableClick}>
      <div className="flex items-center py-6 w-56 pl-6 gap-3">
        <svg className="w-6 h-6 fill-emerald-600" viewBox="0 0 24 24">
          {icon}
        </svg>
        <h3 className="font-semibold">{name}</h3>
      </div>
    </NavLink>
  );
}
