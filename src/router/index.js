import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "../views/coaches/CoachesList.vue";
import CoachDetails from "../views/coaches/CoachDetails.vue";
import CoachRegistration from "../views/coaches/CoachRegistration.vue";

import ContactCoach from "../views/requests/ContactCoach.vue";
import ReceivedRequests from "../views/requests/ReceivedRequests.vue";

import NotFound from "../views/NotFound.vue";

const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachDetails,
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  { path: "/register", component: CoachRegistration },
  { path: "/requests", component: ReceivedRequests },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
