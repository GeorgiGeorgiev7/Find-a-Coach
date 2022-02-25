import { createStore } from "vuex";
import coachesModule from './modules/coaches/index.js';


export default createStore({
  modules: {
    coaches: coachesModule
  },
});
