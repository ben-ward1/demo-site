import { createStore, combineReducers } from "redux";
import { reducer as appReducer } from "./reducers";

const reducers = combineReducers({
  app: appReducer,
});

export type IAppState = ReturnType<typeof reducers>;

export const store = createStore(reducers);
