import { NavLink, useLocation } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";

export default function MobileDockNav() {
  const { pathname } = useLocation();

  return (
    <div className="dock dock-md fixed bottom-0 inset-x-0 z-50 bg-base-100 border-t md:hidden">
      <NavLink to="/" className={pathname === "/" ? "dock-active" : ""}>
        <AiOutlineHome className="size-[1.2em]" />
        <span className="dock-label">Home</span>
      </NavLink>

      <NavLink
        to="/search"
        className={pathname === "/search" ? "dock-active" : ""}
      >
        <BiSearchAlt2 className="size-[1.2em]" />
        <span className="dock-label">Search</span>
      </NavLink>
    </div>
  );
}
