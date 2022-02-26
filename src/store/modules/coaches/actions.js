export default {
    registerCoach(context, data) {  // ToDo: send to server 
        data.id = context.rootGetters.userId;
        context.commit('registerCoach', data);
    }
}