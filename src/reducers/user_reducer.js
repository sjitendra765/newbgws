

import { FETCH_USER, FETCH_BLOCK,FETCH_SUSPEND,ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { user: [], message: '', error: '' };

export default function (state = [], action) {
  ;      
  switch (action.type) {
    case FETCH_USER:
      return state= action.payload;
      case FETCH_BLOCK:        
      var user = state[action.i]
      return [...state.splice(0,action.i),
      				{...state[action.i],
                _id:user._id,
                accountNumber: user.accountNumber,
                bankName: user.bankName,
                blocked: action.b,
                branch: user.branch,
                contact : user.contact,
                firstName : user.firstName,
                suspended : user.suspended},
      				...state.splice(action.i + 1)
      		];
      case FETCH_SUSPEND:
      var user = state[action.i]
      		return [...state.splice(0,action.i),
      				{...state[action.i],
      					_id:user._id,
                accountNumber: user.accountNumber,
                bankName: user.bankName,
                blocked: user.blocked,
                branch: user.branch,
                contact : user.contact,
                firstName : user.firstName,
                suspended : action.b},
      			...state.splice(action.i + 1)
      		];

    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
