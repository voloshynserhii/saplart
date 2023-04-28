import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc } from "../../api";

const initialState = {
  documents: [],
  totalDocs: 0,
  current: null,
  error: "",
  errors: [],
  news: []
};

export const createDoc = createAsyncThunk("createDoc", async (query) => {
  return doc.createDoc(query);
});

export const getDoc = createAsyncThunk("getDoc", async (query) => {
  return doc.getDoc(query);
});

export const getDocs = createAsyncThunk("getDocs", async (query) => {
  return doc.getDocs(query);
});

export const updateDoc = createAsyncThunk("updateDoc", async (id, query) => {
  return doc.updateDoc(id, query);
});

export const deleteDoc = createAsyncThunk("deleteDoc", async (query) => {
  return doc.deleteDoc(query);
});

export const getHistory = createAsyncThunk("getHistory", async (query) => {
  return doc.getHistory(query);
});

export const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    setDocs: (state, action) => {
      state.documents = action.payload;
      state.error = "";
    },
    setCurrentDocument: (state, action) => {
      state.current = action.payload;
      state.error = "";
    },
    clearDocErrors: (state, action) => {
      state.errors = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDoc.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error;
        }
        if (action.payload.doc) {
          // state.documents = [...state.documents, action.payload.doc];
          state.error = "";
        }
      })
      .addCase(getDoc.fulfilled, (state, action) => {
        if (action.payload.doc) {
          state.current = action.payload.doc;
          state.error = "";
        }
        if(action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(getDocs.fulfilled, (state, action) => {
        if (action.payload.docs) {
          state.documents = action.payload.docs;
          state.totalDocs = action.payload.totalItems;
          state.error = "";
        }
        if(action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(updateDoc.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error;
        }
        if (action.payload.doc) {
          const filteredDocs = state.documents.filter(
            (doc) => doc._id !== action.payload.doc?._id
          );
          state.documents = [...filteredDocs, action.payload.doc];
          state.error = "";
        }
      })
      .addCase(deleteDoc.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error;
        }
        if (action.payload) {
          state.current = null;
          state.error = "";
        }
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        if(action.payload.logs) {
          state.news = action.payload.logs
        }
      })
  },
});

export const { clearDocErrors, setDocs, setCurrentDocument } = docSlice.actions;

export const state = (state) => state.doc;

export default docSlice.reducer;
