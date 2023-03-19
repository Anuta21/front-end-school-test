import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { coursePageSlice, coursesListPageSlice } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const reducersToPersist = combineReducers({
  coursesListPage: coursesListPageSlice.reducer,
  coursePage: coursePageSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducersToPersist);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
