import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getUserData } from "./userSlice";

export const getJobs = async () => {
  const response = await axios.get("/jobs");
  const jobsRequestsData = await response.data.data;
  console.log("Response: ", jobsRequestsData);
  return jobsRequestsData;
};

export const getUsers = createAsyncThunk(
  "usersRequests/getUsersRequests",
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().usersApp.users.routeParams;
    const response = await axios
      .get("/users/for-admin", {
        params: routeParams,
      })
      .catch((err) => console.log(err));
    const usersRequestsData = response.data.data;
    console.log("data inside Slice:", usersRequestsData);
    return usersRequestsData;
  }
);

//  =

export const assignJobToUser = createAsyncThunk(
  "usersRequests/getUsersRequests/assignJobToUser",
  async ({ userId, jobId, level }, { dispatch }) => {
    console.log("hi in new function");
    console.log("invoiceId, userId, message", userId, jobId, level);
    const response = await axios
      .patch(`/users/for-admin/${userId}/assign-job`, {
        jobId,
        level,
      })
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    console.log("assign job to user: ", data);

    // dispatch(getInvoice(data?.id));
    dispatch(getUsers());
    return data;
  }
);

export const toggleStarredContact = createAsyncThunk(
  "contactsApp/contacts/toggleStarredContact",
  async (contactId, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/toggle-starred-contact",
      { contactId }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

// approve user
export const approveUser = createAsyncThunk(
  "usersRequests/approve",
  async (id, { dispatch }) => {
    const response = await axios
      .post(`/auth-for-admin/approve-user/${id}`)
      .catch((err) => console.log(err));
    const data = await response.data.data;

    dispatch(getUsersRequests());
    console.log("user approve inside Slice: ", data);

    return data;
  }
);

// reject user
export const rejectUser = createAsyncThunk(
  "usersRequests/reject",
  async (id, { dispatch }) => {
    const response = await axios.post(`/auth-for-admin/reject-user/${id}`);
    // .catch((err) => console.log(err));
    const data = await response.data.data;

    console.log("user reject inside Slice: ", data);
    dispatch(getUsersRequests());
    return data;
  }
);

export const addContact = createAsyncThunk(
  "contactsApp/contacts/addContact",
  async (contact, { dispatch, getState }) => {
    const response = await axios.post("/api/contacts-app/add-contact", {
      contact,
    });
    const data = await response.data;

    dispatch(getContacts());

    return data;
  }
);

export const updateContact = createAsyncThunk(
  "contactsApp/contacts/updateContact",
  async (contact, { dispatch, getState }) => {
    const response = await axios.post("/api/contacts-app/update-contact", {
      contact,
    });
    const data = await response.data;

    dispatch(getContacts());

    return data;
  }
);

export const removeContact = createAsyncThunk(
  "contactsApp/contacts/removeContact",
  async (contactId, { dispatch, getState }) => {
    await axios.post("/api/contacts-app/remove-contact", { contactId });

    return contactId;
  }
);

export const removeContacts = createAsyncThunk(
  "contactsApp/contacts/removeContacts",
  async (contactIds, { dispatch, getState }) => {
    await axios.post("/api/contacts-app/remove-contacts", { contactIds });

    return contactIds;
  }
);

export const toggleStarredContacts = createAsyncThunk(
  "contactsApp/contacts/toggleStarredContacts",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/toggle-starred-contacts",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsStarred = createAsyncThunk(
  "contactsApp/contacts/setContactsStarred",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/set-contacts-starred",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsUnstarred = createAsyncThunk(
  "contactsApp/contacts/setContactsUnstarred",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/set-contacts-unstarred",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } =
  usersAdapter.getSelectors((state) => state.usersApp.users);

const usersSlice = createSlice({
  name: "usersApp/users",
  initialState: usersAdapter.getInitialState({
    users: [],
    searchText: "",
    approve: null,
    status: null,
    routeParams: {},
    contactDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    // openNewContactDialog: (state, action) => {
    //   state.contactDialog = {
    //     type: "new",
    //     props: {
    //       open: true,
    //     },
    //     data: null,
    //   };
    // },
    // closeNewContactDialog: (state, action) => {
    //   state.contactDialog = {
    //     type: "new",
    //     props: {
    //       open: false,
    //     },
    //     data: null,
    //   };
    // },
    // openEditContactDialog: (state, action) => {
    //   state.contactDialog = {
    //     type: "edit",
    //     props: {
    //       open: true,
    //     },
    //     data: action.payload,
    //   };
    // },
    // closeEditContactDialog: (state, action) => {
    //   state.contactDialog = {
    //     type: "edit",
    //     props: {
    //       open: false,
    //     },
    //     data: null,
    //   };
    // },
  },
  extraReducers: {
    // [updateContact.fulfilled]: contactsAdapter.upsertOne,
    // [addContact.fulfilled]: contactsAdapter.addOne,
    // [removeContacts.fulfilled]: (state, action) =>
    //   contactsAdapter.removeMany(state, action.payload),
    // [removeContact.fulfilled]: (state, action) =>
    //   contactsAdapter.removeOne(state, action.payload),

    [getUsers.fulfilled]: (state, { payload }) => {
      const data = payload.filter(
        (u) => u.isActive === true && u.isVerified === true
      );
      usersAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },

    [approveUser.pending]: (state) => {
      state.approve = "loading approve";
    },
    [approveUser.fulfilled]: (state, action) => {
      state.approve = "success approve";
      usersAdapter.addOne;
    },
    [approveUser.rejected]: (state) => {
      state.approve = "failed approve";
    },

    [rejectUser.pending]: (state) => {
      state.approve = "loading reject";
    },
    [rejectUser.fulfilled]: (state, action) => {
      state.approve = "success reject";
      usersAdapter.removeOne(state, action.payload);
    },
    [rejectUser.rejected]: (state) => {
      state.approve = "failed reject";
    },
  },
});

export const {
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
} = usersSlice.actions;

export default usersSlice.reducer;
