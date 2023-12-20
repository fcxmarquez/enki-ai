export enum ActionType {
  SHOW_MODAL = "SHOW_MODAL",
  HIDE_MODAL = "HIDE_MODAL",
  SET_STATUS = "SET_STATUS",
  // Add other action types as needed
}

export interface ShowModalAction {
  type: ActionType.SHOW_MODAL;
  modalId: string;
  message: string;
  title: string;
}

export interface HideModalAction {
  type: ActionType.HIDE_MODAL;
  modalId: string;
}

export interface SetStatusAction {
  type: ActionType.SET_STATUS;
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export type UIAction = ShowModalAction | HideModalAction | SetStatusAction;

export // Define the state structure
interface UIState {
  data: {
    status: "idle" | "loading" | "success" | "error";
    message: string;
  };
  app: {
    modals: {
      [modalId: string]: {
        isOpen: boolean;
        message: string;
        title: string;
      };
    };
  };
}
