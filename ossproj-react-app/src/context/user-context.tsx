import React, { useReducer, useContext, createContext, Dispatch } from "react";

type State = {
  name: string;
  rooms: number[];
  urls: string[];
};

type Action =
  | { type: "SET_NAME"; name: string }
  | { type: "SET_ROOMS"; rooms: number[] }
  | { type: "SET_URLS"; urls: string[] };

type UserDispatch = Dispatch<Action>;

const UserStateContext = createContext<State | null>(null);
const UserDispatchContext = createContext<UserDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_ROOMS":
      return {
        ...state,
        rooms: action.rooms, // text가 자동완성되며, string 타입인걸 알 수 있습니다.
      };
    case "SET_URLS":
      return {
        ...state,
        urls: action.urls, // color 가 자동완성되며 color 가 Color 타입인걸 알 수 있습니다.
      };
    default:
      throw new Error("Unhandled action");
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    name: "kim",
    rooms: [],
    urls: [],
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
