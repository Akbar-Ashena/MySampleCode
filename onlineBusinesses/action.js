import { DEFAULT_ACTION } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOnlineBusinessList(onlineBuisinesesList) {
  return {
    type: "SET_BUSINESSESLIST",
    onlineBuisinesesList,
  };
}
