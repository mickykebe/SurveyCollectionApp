export const OPERATOR_CODES_ALL = 'all';
export const OPERATOR_CODES_LOGICAL = 'logical';

const operators = (state = {}, action) => {
  return {
    byCode: {
      "&&": {
        code: '&&',
        text: 'And',
        type: 'logical',
      },
      "||": {
        code: '||',
        text: 'Or',
        type: 'logical'
      },
      "==": {
        code: '==',
        text: 'Is equal to',
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
      "one-of": {
        code: 'one-of',
        text: 'Is one of',
        type: 'relational',
      }
    },
    [OPERATOR_CODES_ALL]: ["&&", "||", "==", "!=", "<", ">", "<=", ">=", "one-of"],
    [OPERATOR_CODES_LOGICAL]: ["&&", "||"],
  };
}

export default operators;

export const getOperators = (state, opCodes) =>
  state[opCodes].map(code => state.byCode[code]);
export const getOperator = (state, code) =>
  state.byCode[code];
