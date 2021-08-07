import ClaimsService from '../services/claimsService';

export const requestWarrantyClaimsType = 'REQUEST_WARRANTY_CLAIMS';
export const receiveWarrantyClaimsType = 'RECEIVE_WARRANTY_CLAIMS';
export const setVisibilityFilter = 'SET_VISIBILITY_FILTER';

const initialState = {
    claims: [],
    claimsLoading: false,
    lastLoad: null
};

export const actionCreators = {
    requestWarrantyClaims: () => async (dispatch, getState) => {
        let currentState = getState();
        var currentTime = new Date();

        //Prevent duplicative calls - only update if it has been a second since the previous call
        if (currentTime - currentState.claims.lastLoad > 1000) {
            //Dispatch the request action (to indicate we're loading claims)
            dispatch({ type: requestWarrantyClaimsType });

            //Actually get the claims data
            var claimsService = new ClaimsService(getState);
            const claims = await claimsService.getClaims();

            //Dispatch the loaded action
            dispatch({ type: receiveWarrantyClaimsType, claims });
        }

    }

};

//to be used for NavLink
function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestWarrantyClaimsType:
            return {
                ...state,
                claimsLoading: true
            };
        case receiveWarrantyClaimsType:
            return {
                ...state,
                claims: action.claims,
                claimsLoading: false,
                lastLoad: new Date()
            };
        default:
            return {
                ...state

            };
    }
};
