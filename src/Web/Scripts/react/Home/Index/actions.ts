import { AppEvents } from "./events";

const makeAction = <T extends AppEvents, P>(type: T) => (payload: P) => {
  return {
    type,
    payload,
  };
};

export const SetName = makeAction<AppEvents.SET_NAME, string>(
  AppEvents.SET_NAME
);

export const SetMessage = makeAction<AppEvents.SET_MESSAGE, string>(
  AppEvents.SET_MESSAGE
);

export const ChangeStep = makeAction<AppEvents.CHANGE_STEP, number>(
  AppEvents.CHANGE_STEP
);

export const ResetWizard = makeAction<AppEvents.RESET_WIZARD, void>(
  AppEvents.RESET_WIZARD
);

interface IStringMap<T> {
  [key: string]: T;
}

type IAnyFunction = (...args: any[]) => any;
type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

const actions = {
  SetName,
  SetMessage,
  ChangeStep,
  ResetWizard,
};

export type IAction = IActionUnion<typeof actions>;
