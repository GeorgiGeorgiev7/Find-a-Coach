import { createRouter, createWebHistory } from "vue-router";

const CoachesList = () => import("../views/coaches/CoachesList.vue");
const CoachDetails = () => import("../views/coaches/CoachDetails.vue");
const CoachRegistration = () => import("../views/coaches/CoachRegistration.vue");


const ContactCoach = () => import("../views/requests/ContactCoach.vue");
const ReceivedRequests = () => import("../views/requests/ReceivedRequests.vue");

const UserAuth = () => import("../views/auth/UserAuth.vue");

const NotFound = () => import("../views/NotFound.vue");

import store from '../store';


const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachDetails,
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  { path: "/register", component: CoachRegistration, meta: { requiresAuth: true } },
  { path: "/requests", component: ReceivedRequests, meta: { requiresAuth: true } },
  { path: "/auth", component: UserAuth, meta: { requiresNonAuth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/404');
  } else if (to.meta.requiresNonAuth && store.getters.isAuth) {
    next('/404');
  } else {
    next();
  }
});

export default router;
