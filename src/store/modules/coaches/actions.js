export default {
    async registerCoach(context, coachData) {
        const userId = context.rootGetters.userId;
        coachData.id = userId;

        const response = await fetch(`https://find-a-coach-470b3-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coachData)
        });

        if (!response.ok) {
            // add err handling
            return;
        }

        context.commit('registerCoach', coachData);
    },
    async loadCoaches(context) {
        const response = await fetch(`https://find-a-coach-470b3-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);

        if (!response.ok) {
            throw new Error('Failed to fetch! Please try again later.');
        }

        const responseData = await response.json();

        const coaches = [...Object.values(responseData)];

        context.commit('setCoaches', coaches);
    }
};
