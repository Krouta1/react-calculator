import React from 'react';
import { ACTIONS } from './Calculator';

const DigitButton = ({ digit, dispatch, className }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      className={`py-3 rounded-lg text-lg font-bold ${className} transition duration-200`}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
