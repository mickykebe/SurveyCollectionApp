import { 
  ACTION_POPUP_MESSAGE_SET,
  ACTION_POPUP_MESSAGE_CLEAR
} from '../actions/types';

export default (state = {
  popupMessage: null,
}, action) => {
  switch(action.type) {
    case ACTION_POPUP_MESSAGE_SET:
      return {
        ...state,
        popupMessage: action.message
      };
    case ACTION_POPUP_MESSAGE_CLEAR:
      return {
        ...state,
        popupMessage: null,
      };
    default:
      return state;
  }
}

export const getPopupMessage = (state) =>
  state.popupMessage;