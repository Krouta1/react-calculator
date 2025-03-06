import React from 'react';
import { ACTIONS } from './Calculator';

const OperationButton = ({ operation, dispatch, className }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
      className={`py-3 rounded-lg text-lg font-bold ${className} transition duration-200`}
    >
      {operation}
    </button>
  );
};

export default OperationButton;
