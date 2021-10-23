/* eslint-disable import/no-anonymous-default-export */
export default async (state = [], action) => {

    switch (action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        case 'GET_FAVORITES':
            return  action.payload;
        default:
            return state;
    }
};
