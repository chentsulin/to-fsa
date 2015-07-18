import { isFSA } from 'flux-standard-action';
import uniqueId from 'lodash.uniqueid';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function unknownId() {
  return _.uniqueId('UNKNOWN_');
}

function errorId() {
  return _.uniqueId('ERROR_');
}

export default function toFSA(action) {
  if (isFSA(action)) return action;
  if (typeof action === 'string') {
    return {
      type: action
    };
  } else if (
    typeof action === 'boolean' ||
    typeof action === 'number'  ||
    typeof action === 'function'
  ) {
    return {
      type: unknownId(),
      payload: action
    };
  }

  if (typeof action === 'object') {
    if (action instanceof Error) {
      return {
        type: 'ERROR_',
        payload: action,
        error: true
      };
    } else {
      let fsa = {};
      if (typeof action.type === 'string') fsa.type = action.type;
      if (action.payload != undefined) fsa.payload = action.payload;
      if (typeof action.error === 'boolean') fsa.error = action.error;
      if (action.meta!= undefined) fsa.meta = action.meta;
      return fsa;
    }
  };

  return {
    type: unknownId()
  };
}
