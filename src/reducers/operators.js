export const OPERATOR_TYPE_ALL = 'all';
export const OPERATOR_TYPE_LOGICAL = 'logical';

const operators = (state = {}, action) => {
  return {
    byCode: {
      "&&": {
        code: '&&',
        text: 'And',
        type: 'logical',
      },
      "||": {
        id: 2,
        code: '||',
        text: 'Or',
        type: 'logical'
      },
      "==": {
        code: '==',
        text: 'Is Equal to',
        type: 'relational'
      },
      "!=": {
        code: '!=',
        text: 'Is not equal to',
        type: 'relational'
      },
      "<": {
        code: '<',
        text: 'Is less than',
        type: 'relational'
      },
      ">": {
        code: '>',
        text: 'Is greater than',
        type: 'relational'
      },
      "<=": {
        code: '<=',
        text: 'Is less than or equal to',
        type: 'relational'
      },
      ">=": {
        code: '>=',
        text: 'Is greater than or equal to',
        type: 'relational'
      },
    },
    [OPERATOR_TYPE_ALL]: ["&&", "||", "==", "!=", "<", ">", "<=", ">="],
    [OPERATOR_TYPE_LOGICAL]: ["&&", "||"],

  };
}

export default operators;

export const getOperators = (state, type) =>
  state[type].map(code => state.byCode[code]);
export const getOperator = (state, code) =>
  state.byId[code];
