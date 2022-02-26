export default {
    async contactCoach(context, request) {
        const response = await fetch(`https://find-a-coach-470b3-default-rtdb.europe-west1.firebasedatabase.app/requests/${request.coachId}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error('Failed to send request. Please try again later');
        }

        const responseData = await response.json();

        request.id = responseData.name;

        context.commit('addRequest', request);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;

        const token = context.rootGetters.token;

        const response = await fetch(`https://find-a-coach-470b3-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`);

        if (!response.ok) {
            throw new Error('Failed to fetch requests');
        }

        const responseData = await response.json();
        if (!responseData) {
            context.commit('setRequests', []);
        } else {
            const requests = [];
            for (const [requestId, request] of Object.entries(responseData)) {
                request.id = requestId;
                requests.push(request);
            }

            context.commit('setRequests', requests);
        }


    }
}