// eslint-disable-next-line import/no-anonymous-default-export
export default (state = true, action) => {
    switch (action.type) {
        case 'TOGGLE_MODE':
            return !state
        default:
            return state;
    }
};
