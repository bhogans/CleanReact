import ClaimsService from '../services/claimsService';
import { receiveWarrantyClaimsType } from './WarrantyClaims';
const submitNewClaimType = 'SUBMIT_NEW_CLAIM';
const newClaimSuccessType = 'NEW_CLAIM_SUCCESS';
const newClaimFailureType = 'NEW_CLAIM_FAILURE';

const openNewClaimModalType = 'OPEN_NEW_CLAIM_MODAL';
const closeNewClaimModalType = 'CLOSE_NEW_CLAIM_MODAL';

const initialState = {
  newClaim: {}
};

export const actionCreators = {

  submitNewClaim: (newClaimData) => async (dispatch, getState) => {

    //Dispatch the new claim type being submitted action
    dispatch({ type: submitNewClaimType });

    let newClaim, newClaimJson;

    try {
      var claimsService = new ClaimsService(getState);

      //Actually add the new claim
      newClaim = await claimsService.addClaim(newClaimData);

      if (newClaim.ok) {
        //Get the body of the response
        newClaimJson = await newClaim.json();
      } else {
        throw new Error("Failed to add new claim.");
      }

    } catch (error) {
      dispatch({ type: newClaimFailureType, error });
      return;
    }
    //Assuming no error...
    //Dispatch the success action to add the new claim
    dispatch({ type: newClaimSuccessType, newClaimJson });

    //Dispatch the close modal
    dispatch({ type: closeNewClaimModalType });

    //Take a copy of the existing claims and add the new claim onto it
    var newClaimsList = [...getState().claims.claims, newClaimJson];

    //Dispatch claims received action to update list w/ new claim
    dispatch({ type: receiveWarrantyClaimsType, claims: newClaimsList });


  },


  openNewClaimModal: () => async (dispatch, getState) => {
    dispatch({ type: openNewClaimModalType });
  },
  closeNewClaimModal: () => async (dispatch, getState) => {
    dispatch({ type: closeNewClaimModalType });
  }

};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {

    case openNewClaimModalType:
      return {
        ...state,
        modalOpen: true
      }
    case closeNewClaimModalType:
      return {
        ...state,
        modalOpen: false
      }

    case submitNewClaimType:
      return {
        ...state,
        submitting: true
      };
    case newClaimSuccessType:

      return {
        ...state,
        submitting: false
      };
    case newClaimFailureType:
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
