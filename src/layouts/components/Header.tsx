import { NavLink } from "react-router";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  return (
    <header className="navbar bg-base-100 border-b px-4 py-2 flex flex-wrap items-center justify-between gap-4">
      <div className="shrink-0">
        <span className="text-xl font-black tracking-tight text-primary">
          <span className="text-base-content">Lib</span>
          <span className="text-primary">rary</span>
        </span>
      </div>

      <form className="flex-1 max-w-md w-full">
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Search books..."
            className="input input-bordered input-sm w-full"
          />
        </div>
      </form>

      <div className="flex items-center gap-2 shrink-0">
        <nav className="hidden md:flex gap-2 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/subjects"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }
          >
            Subjects
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }
          >
            Search
          </NavLink>
        </nav>
        <ThemeToggler />
      </div>
    </header>
  );
}
