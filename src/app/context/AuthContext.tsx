import CreateDataContext from "./CreateDataContext";
import { AuthState, AuthUser } from "@/app/types/api/auth";

const initialState: AuthState = {
  session: false,
  user: null,
};

type Action =
  | { type: "SET";  payload: AuthUser }
  | { type: "LOGOUT" };

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "SET":
      return { session: true, user: action.payload };
    case "LOGOUT":
      return { session: false, user: null };
    default:
      return state;
  }
};

const setInfo =
  (dispatch: React.Dispatch<Action>) => (user: AuthUser) => {
    dispatch({ type: "SET", payload: user });
  };

const logout =
  (dispatch: React.Dispatch<Action>) => () => {
    dispatch({ type: "LOGOUT" });
  };

export const { Context: AuthContext, Provider: AuthProvider } =
  CreateDataContext(reducer, { setInfo, logout }, initialState);
