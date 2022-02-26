export default {
    contactCoach(context, request) {  // ToDo: server http req
        request.id = new Date().toISOString();
        context.commit('addRequest', request);
    }
}