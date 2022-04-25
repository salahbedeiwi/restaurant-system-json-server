import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../components/Login/Login.vue";
import ErrorPage from "../components/ErrorPage/ErrorPage.vue";
import Update from "../views/Update.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import Profile from "../views/Profile.vue";
import UpdateProfile from "../views/UpdateProfile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/update",
    name: "Update",
    component: Update,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/updateProfile",
    name: "UpdateProfile",
    component: UpdateProfile,
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
  },
  {
    path: "/edit/:restId/:userId",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.params.pageTitle !== undefined) {
    // if page title is empty or
    document.title = `${to.params.pageTitle} | ${process.env.VUE_APP_TITLE}`;
  } else {
    if (to.name == null) {
      document.title = `Unknow Page | ${process.env.VUE_APP_TITLE}`;
    } else {
      document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`;
    }
  }
  next();
});
export default router;
