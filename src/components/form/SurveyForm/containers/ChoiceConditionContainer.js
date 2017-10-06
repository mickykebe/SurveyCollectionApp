import { formValues } from 'redux-form';
import ChoiceCondition from '../components/ChoiceCondition';

export default formValues({conditionValue: 'value'})(ChoiceCondition);