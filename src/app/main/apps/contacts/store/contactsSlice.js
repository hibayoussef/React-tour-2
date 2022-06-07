import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getUserData } from "./userSlice";

export const getUsersRequests = createAsyncThunk(
  "usersRequests/getUsersRequests",
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().contactsApp.contacts.routeParams;
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


export const getDepartments = async () => {
  const response = await axios.get("/departments");
  console.log("get Users response:  ", response);
  return response.data.data;
};


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
  async ({id, departmentId}, { dispatch }) => {
    const response = await axios
      .post('/auth-for-admin/approve-user', {
        id, 
        departmentId
      })
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

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } =
  contactsAdapter.getSelectors((state) => state.contactsApp.contacts);

const contactsSlice = createSlice({
  name: "contactsApp/contacts",
  initialState: contactsAdapter.getInitialState({
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
    openNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },

    
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

    [getUsersRequests.fulfilled]: (state, action) => {
      // console.log("innnnnn: ", action.payload);
      // const data = action.payload;
      // console.log("240000000: ", data);
      // contactsAdapter.setAll(state, data);
      // state.searchText = "";
      // console.log("innnnnn: ", data);

      const data = action.payload.filter(
        (u) => u.isActive === false && u.isVerified === false
      );
      contactsAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },

    [approveUser.pending]: (state) => {
      state.approve = "loading approve";
    },
    [approveUser.fulfilled]: (state, action) => {
      state.approve = "success approve";
      contactsAdapter.addOne;
    },
    [approveUser.rejected]: (state) => {
      state.approve = "failed approve";
    },

    [rejectUser.pending]: (state) => {
      state.approve = "loading reject";
    },
    [rejectUser.fulfilled]: (state, action) => {
      state.approve = "success reject";
      contactsAdapter.removeOne(state, action.payload);
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
} = contactsSlice.actions;

export default contactsSlice.reducer;
