import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryItem } from "../../utils/types/items.type";

interface TItemsSlice {
  itemsCategory: CategoryItem | null;
}

const initialState: TItemsSlice = {
  itemsCategory: null,
};

export const ItemsSlice = createSlice({
  name: "Items",
  initialState,
  reducers: {
    setItemCategory: (state, action: PayloadAction<CategoryItem>) => {
      state.itemsCategory = action.payload;
    },
  },
});

export default ItemsSlice.reducer;
export const { setItemCategory } = ItemsSlice.actions;
