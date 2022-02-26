import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "../views/coaches/CoachesList.vue";
import CoachDetails from "../views/coaches/CoachDetails.vue";
import CoachRegistration from "../views/coaches/CoachRegistration.vue";

import ContactCoach from "../views/requests/ContactCoach.vue";
import ReceivedRequests from "../views/requests/ReceivedRequests.vue";

import UserAuth from "../views/auth/UserAuth.vue";

import NotFound from "../views/NotFound.vue";

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
    next('/auth');
  } else if (to.meta.requiresNonAuth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
