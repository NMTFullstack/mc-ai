import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateProps } from "./interfaces";

const initialState: StateProps = {
  
};

export const PreviewSlide = createSlice({
  name: "content",
  initialState,
  reducers: {
    
  },
});

export const {
 
} = PreviewSlide.actions;

export default PreviewSlide.reducer;
