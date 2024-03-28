export enum ActionType {
  SHOW_MODAL = "SHOW_MODAL",
  HIDE_MODAL = "HIDE_MODAL",
  SET_STATUS = "SET_STATUS",
  // Add other action types as needed
}

export interface ShowModalAction {
  type: ActionType.SHOW_MODAL;
  children: JSX.Element;
}

export interface HideModalAction {
  type: ActionType.HIDE_MODAL;
}

export interface SetStatusAction {
  type: ActionType.SET_STATUS;
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export type UIAction = ShowModalAction | HideModalAction | SetStatusAction;

export interface UIState {
  data: {
    status: "idle" | "loading" | "success" | "error";
    message: string;
  };
  app: {
    modal: {
      isOpen: boolean;
      children: JSX.Element;
    };
    states: object;
  };
}
