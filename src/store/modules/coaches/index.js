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
                    hourlyRate: 40
                },
                {
                    id: '2',
                    firstName: 'Niko',
                    lastName: 'Petrov',
                    areas: ['python', 'web3', 'games'],
                    description: 'The middle choice',
                    hourlyRate: 30
                },
                {
                    id: '3',
                    firstName: 'Daniel',
                    lastName: 'Dudev',
                    areas: ['rowing', 'cayak', 'swimming'],
                    description: 'Not the best choice',
                    hourlyRate: 20
                }
            ]
        };
    },
    mutations,
    actions,
    getters
};