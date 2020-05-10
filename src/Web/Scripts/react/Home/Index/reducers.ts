import { AppEvents } from "./events";
import { IAction } from "./actions";

const initState: IState = {
  name: "",
  message: "",
  step: 1,
};

export interface IState {
  name: string;
  message: string;
  step: number;
}

export const reducer = (state: IState = initState, action: IAction): IState => {
  switch (action.type) {
    case AppEvents.SET_NAME:
      return { ...state, name: action.payload };

    case AppEvents.SET_MESSAGE:
      return { ...state, message: action.payload };

    case AppEvents.CHANGE_STEP:
      return { ...state, step: action.payload };

    case AppEvents.RESET_WIZARD:
      return { name: "", message: "", step: 1 };

    default:
      return state;
  }
};
