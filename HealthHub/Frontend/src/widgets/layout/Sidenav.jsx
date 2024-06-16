import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { RectangleStackIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context/MaterialTailwind";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Sidenav({ brandImg, brandName, routes }) {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const { token, userId, username } = useUser();

  return (
    <aside
      className={`bg-surface-dark px-4 ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 `}
    >
      <div className={`relative`}>
        <Link to="/" className="pt-5 flex items-center justify-center">
          <img src={brandImg} alt="logo" className="h-24 ml-[-0.75rem]" />
          {/* <Typography
            variant="h3"
            color={"white"}
            className="w-min"
          >
            {brandName}
          </Typography> */}
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="my-4">
        {routes.map(({ layout, pages }, key) => (
          <ul key={key} className="flex flex-col gap-1 opacity-80">
            {pages
              // .filter(({ name }) => layout === "dashboard" && !["profile"].includes(name))
              .filter(
                ({ name }) =>
                  layout === "dashboard" &&
                  name !== "cuisine" &&
                  name !== "search-recipe" &&
                  name !== "recipe-details" &&
                  name !== "other-profile" &&
                  name !== "workout-details" &&
                  name !== "biceps-counter" &&
                  name !== "squat-counter" &&
                  name !== "pushup-counter" &&
                  name !== "shoulder-counter" &&
                  name !== "assistant"
              )
              .map(({ icon, name, path }) => (
                <li key={name} className="py-1 ![&>a]:flex-1">
                  <NavLink to={`/${layout}${path}`} className={"flex-1"}>
                    {({ isActive }) => (
                      <Button
                        className={`flex gap-2 items-center px-4 hover:bg-secondary ${
                          isActive
                            ? "bg-primary"
                            : "bg-surface-dark shadow-none"
                        } `}
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className={`font-medium capitalize`}
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
          </ul>
        ))}
      </div>
      <hr className="border-t border-surface-mid  mt-2" />
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "HealthHub",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
