import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import sortBy from "lodash/sortBy";
import axios from "axios";
import { CardType } from "../assets/types/cardType";
import { RootState } from "./store";

export const getCardsList = createAsyncThunk(
  "cards/getList",
  async (limit?: number): Promise<CardType[]> => {
    const response = await axios.get<CardType[]>(
      "https://api.spaceflightnewsapi.net/v3/articles",
      {
        headers: { Accept: "application/json" },
        params: { _limit: limit ?? 21 },
      }
    );

    return response.data;
  }
);

const cardsAdapter = createEntityAdapter<CardType>({
  selectId: (card: CardType) => card.id,
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState: cardsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardsList.fulfilled, (state, action) => {
      cardsAdapter.setAll(state, action.payload);
    });
  },
});
export const selectors = cardsAdapter.getSelectors(
  (state: RootState) => state.cards
);

export const getAllByScore = createSelector(
  [selectors.selectAll, (_, value) => value],
  (list, value) => {
    if (!value) {
      return list;
    }

    const listWithScore: CardType & { score: number }[] = list.map(
      (entity) => ({
        ...entity,
        score:
          (entity.title.includes(value) ? 1 : 0) +
          (entity.summary.includes(value) ? 0.5 : 0),
      })
    );

    return sortBy(listWithScore, ["score"]).reverse();
  }
);

export default cardsSlice.reducer;
