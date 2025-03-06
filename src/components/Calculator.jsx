import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import { evaluate, formatOperand } from '../helpers';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.prevOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.prevOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

const Calculator = () => {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='grid grid-cols-4 gap-2 w-80 p-4 bg-gray-800 rounded-lg shadow-lg'>
        {/* Display Screen */}
        <div className='col-span-4 h-20 bg-gray-900 text-white text-right p-4 text-2xl rounded-lg flex flex-col justify-center'>
          <div>
            {formatOperand(prevOperand)} {operation}
          </div>{' '}
          {/* Placeholder for input */}
          <div className='text-lg text-gray-400'>
            {formatOperand(currentOperand)}
          </div>{' '}
          {/* Placeholder for result */}
        </div>

        {/* Buttons */}
        <button
          className='py-3 rounded-lg text-lg font-bold col-span-2 bg-red-500 text-white hover:bg-red-600 transition duration-200'
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button
          className='py-3 rounded-lg text-lg font-bold bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200'
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          DEL
        </button>
        <OperationButton
          operation='/'
          className='bg-blue-500 text-white hover:bg-blue-600'
          dispatch={dispatch}
        />

        <DigitButton
          digit='1'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <DigitButton
          digit='2'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <DigitButton
          digit='3'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <OperationButton
          operation='*'
          className='bg-blue-500 text-white hover:bg-blue-600'
          dispatch={dispatch}
        />

        <DigitButton
          digit='4'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <DigitButton
          digit='5'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <DigitButton
          digit='6'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <OperationButton
          operation='+'
          className='bg-blue-500 text-white hover:bg-blue-600'
          dispatch={dispatch}
        />

        <DigitButton
          digit='7'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <DigitButton
          digit='8'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <DigitButton
          digit='9'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <OperationButton
          operation='-'
          className='bg-blue-500 text-white hover:bg-blue-600'
          dispatch={dispatch}
        />

        <DigitButton
          digit='.'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <DigitButton
          digit='0'
          className='bg-gray-700 text-white hover:bg-gray-600'
          dispatch={dispatch}
        />
        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className='py-3 rounded-lg text-lg font-bold col-span-2 bg-green-500 text-white hover:bg-green-600transition duration-200'
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
