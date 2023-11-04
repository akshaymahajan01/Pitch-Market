import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderslice";
import { userslice } from "./userslice";

const store = configureStore({
  reducer: {
    loaders: loaderSlice.reducer,
    users : userslice.reducer,
  },
});

export default store;