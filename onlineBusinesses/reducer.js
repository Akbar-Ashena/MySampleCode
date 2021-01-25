import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  onlineBuisinesesList: [],
};

const onlineBusinessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BUSINESSESLIST":
      return {
        ...state,
        onlineBuisinesesList: action.onlineBuisinesesList,
      };

    case DEFAULT_ACTION:
      break;
    default:
      return state;
  }
};
export default onlineBusinessesReducer;
