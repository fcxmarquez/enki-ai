import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
  Dispatch,
} from "react";
import { ActionType, UIAction, UIState } from "types/store/ui";

// Define the initial state based on your data structure
const initialState: UIState = {
  data: {
    status: "idle",
    message: "",
  },
  app: {
    modals: {},
  },
};

// Create the context with the initial state and dispatch function
const UIContext = createContext<[UIState, Dispatch<UIAction>]>([
  initialState,
  () => null,
]);

// Create a reducer function
const UIReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case ActionType.SHOW_MODAL:
      return {
        ...state,
        app: {
          ...state.app,
          modals: {
            ...state.app.modals,
            [action.modalId]: {
              isOpen: true,
              message: action.message,
              title: action.title,
            },
          },
        },
      };
    case ActionType.HIDE_MODAL:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.modalId]: _, ...restModals } = state.app.modals;
      return {
        ...state,
        app: {
          ...state.app,
          modals: restModals,
        },
      };
    case ActionType.SET_STATUS:
      return {
        ...state,
        data: {
          ...state.data,
          status: action.status,
          message: action.message,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

// Create a provider component
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UIReducer, initialState);
  const value: [UIState, Dispatch<UIAction>] = useMemo(() => [state, dispatch], [state]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

// Hook to use the UI context
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

// Hook to use UI mutations
export const useUIMutation = () => {
  const [, dispatch] = useUI();

  // Functions to dispatch actions
  const showModal = (modalId: string, title: string, message: string) => {
    dispatch({ type: ActionType.SHOW_MODAL, modalId, title, message });
  };

  const hideModal = (modalId: string) => {
    dispatch({ type: ActionType.HIDE_MODAL, modalId });
  };

  const setStatus = (
    status: "idle" | "loading" | "success" | "error",
    message: string
  ) => {
    dispatch({ type: ActionType.SET_STATUS, status, message });
  };

  return { showModal, hideModal, setStatus };
};
