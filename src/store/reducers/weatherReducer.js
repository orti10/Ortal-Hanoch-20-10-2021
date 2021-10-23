/* eslint-disable import/no-anonymous-default-export */
export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_WEATHER':
            return action.payload;
        default:
            return state;
    }
};
