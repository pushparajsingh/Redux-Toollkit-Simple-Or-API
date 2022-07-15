import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: 0,
//   data: [],
// };
export const getApi = createAsyncThunk("posts/getPost", async () => {
  return fetch("https://629dae743dda090f3c07dd7f.mockapi.io/test")
    .then((item) => item.json())
    .then((result) => result)
    .catch((error) => error);
});

export const Delete = createAsyncThunk("posts/deletePost", async (id) => {
  return fetch(`https://629dae743dda090f3c07dd7f.mockapi.io/test/${id}`, {
    method: "DELETE",
  })
    .then((item) => item.json())
    .then((result) => result)
    .catch((error) => console.log(error));
});

// export const Update = createAsyncThunk("put/Update", async (Id, ChangeData) => {
//   console.log("id=", Id);
//   console.log("name:", ChangeData);
//   return fetch(`https://629dae743dda090f3c07dd7f.mockapi.io/test/11`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({
//       id: 11,
//       name: "umesh",
//     }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       return res;
//     });
// });

export const Update = createAsyncThunk(
  "put/Update",
  async ({ Id, ChangeData }) => {
    //yaha destructing kar ka bhajana ha or yaha get karna ha.

    return fetch(`https://629dae743dda090f3c07dd7f.mockapi.io/test/${Id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: Id,
        name: ChangeData,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    data: [],
    error: null,
    del: "",
  },
  loading: false,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [getApi.pending]: (state, action) => {
      state.loading = true;
    },
    [getApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [Delete.pending]: (state, action) => {
      state.loading = true;
    },
    [Delete.fulfilled]: (state, action) => {
      state.loading = false;
      state.delete = action.payload;
    },
    [Delete.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
