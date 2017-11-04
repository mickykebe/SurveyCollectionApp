import { reducer as formReducer} from 'redux-form';
import { ACTION_SURVEY_FORM_COPY_ELEMENT } from '../actions/types';

export default formReducer.plugin({
  surveyForm: (state, action) => {
    switch(action.type) {
      case ACTION_SURVEY_FORM_COPY_ELEMENT:
        return {
          ...state,
          clipboard: action.element,
        };
      default:
        return state;
    }
  }
});

export const getElementFromClipboard = (state) =>
  state.surveyForm.clipboard;