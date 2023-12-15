import { combineReducers } from "@reduxjs/toolkit";
import PreviewSlide from "@/app/preview/preview.slide"
const rootReducer = combineReducers({
  PreviewSlide:PreviewSlide
});

export { rootReducer };
