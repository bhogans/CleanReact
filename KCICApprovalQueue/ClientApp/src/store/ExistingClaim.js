import ClaimsService from '../services/claimsService';
import { receiveWarrantyClaimsType } from './WarrantyClaims';
const submitExistingClaimType = 'SUBMIT_EXISTING_CLAIM';
const existingClaimSuccessType = 'EXISTING_CLAIM_SUCCESS';
const existingClaimFailureType = 'EXISTING_CLAIM_FAILURE';

const openExistingClaimModalType = 'OPEN_EXISTING_CLAIM_MODAL';
const closeExistingClaimModalType = 'CLOSE_EXISTING_CLAIM_MODAL';

const initialState = {
    existingClaim: {}
};

export const actionCreators = {

    submitExistingClaim: (existingClaimData) => async (dispatch, getState) => {

        //Dispatch the new claim type being submitted action
        dispatch({ type: submitExistingClaim });

        let existingClaim, existingClaimJson;

        try {
            var claimsService = new ClaimsService(getState);

            //Actually add the new claim
            existingClaim = await claimsService.updateClaim(existingClaimData);

            if (existingClaim.ok) {
                //Get the body of the response
                existingClaimJson = await existingClaim.json();
            } else {
                throw new Error("Failed to update new claim.");
            }

        } catch (error) {
            dispatch({ type: existingClaimFailureType, error });
            return;
        }
        //Assuming no error...
        //Dispatch the success action to add the new claim
        dispatch({ type: existingClaimSuccessType, existingClaimJson });

        //Dispatch the close modal
        dispatch({ type: closeExistingClaimModalType });

        //Take a copy of the existing claims and add the new claim onto it
        //var existingClaimsList = [...getState().claims.claims, newClaimJson];

        //Dispatch claims received action to update list w/ new claim
        //dispatch({ type: receiveWarrantyClaimsType, claims: newClaimsList });


    },


    openExistingClaimModal: () => async (dispatch, getState) => {
        dispatch({ type: openExistingClaimModalType });
    },
    closeExistingClaimModal: () => async (dispatch, getState) => {
        dispatch({ type: closeExistingClaimModalType });
    }

};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {

        case openExistingClaimModalType:
            return {
                ...state,
                modalOpen: true
            }
        case closeExistingClaimModalType:
            return {
                ...state,
                modalOpen: false
            }

        case submitExistingClaimType:
            return {
                ...state,
                submitting: true
            };
        case existingClaimSuccessType:

            return {
                ...state,
                submitting: false
            };
        case existingClaimFailureType:
            return {
                ...state,
                submitting: false,
                error: action.error
            };
        default:
            return {
                ...state

            };
    }
};
