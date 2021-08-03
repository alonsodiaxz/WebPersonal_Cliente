//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin Pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";

//Pages
import Contact from "../pages/Contact";
import Home from "../pages/Home";

//Error 404
import Error404 from "../pages/Error404";
const routes = [
  {
    path: "/admin",
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
