/* eslint-disable import/no-anonymous-default-export */
const defaultCity = {
    "Version": 1,
    "Key": "215854",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
    },
    "id": "WM8brNU"
}
export default (state = defaultCity, action) => {
    switch (action.type) {
        case 'SET_CITY':
            return action.payload;
        default:
            return state;
    }
};
