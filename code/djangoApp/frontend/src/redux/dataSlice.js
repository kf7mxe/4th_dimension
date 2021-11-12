import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { async } from 'regenerator-runtime';
import { getAllTournaments } from '../services/services';
const initialState = {
  tournaments : [],
  transactions: [],
  users: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setTournaments : (state, action) => {
        state.tournaments = action.payload;
    },
    addTournament: (state, action) => {
      state.tournaments.push(action.payload);
    },
    editStoreTournament: (state, action) => {
      let index = state.tournaments.findIndex((tourney) => {
        return tourney.tournamentid === action.payload.tournamentid
      });
      state.tournaments[index] = action.payload;
    },
    // Takes a tournament id as a payload
    deleteStoreTournament: (state, action) => {
      state.tournaments = state.tournaments.filter((tourney) => {
        return tourney.tournamentid !== action.payload
      });
    },
    setTransactions : (state, action) => {
        state.transactions = action.payload;
    },
    resetData: (state) => {
      state = {...initialState};
    },
    setUserList: (state, action) => {
      state.users = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTournaments, setTransactions, resetData, addTournament, editStoreTournament, deleteStoreTournament, setUserList } = dataSlice.actions

export default dataSlice.reducer