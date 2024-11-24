import { UISlice } from "./slices/uiSlice";
import { ChatSlice } from "./slices/chatSlice";

export type StoreState = UISlice & ChatSlice;
