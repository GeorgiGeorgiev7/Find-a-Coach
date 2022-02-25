import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


export default {
    namespaced: true,
    state() {
        return {
            coaches: [
                {
                    id: '1',
                    firstName: 'Gogo',
                    lastName: 'Nikolaev',
                    areas: ['javascript', 'defi', 'blockchain'],
                    description: 'The best choice',
                    rate: 40
                },
                {
                    id: '2',
                    firstName: 'Niko',
                    lastName: 'Petrov',
                    areas: ['python', 'defi'],
                    description: 'The middle choice',
                    rate: 30
                }
            ]
        };
    },
    mutations,
    actions,
    getters
};