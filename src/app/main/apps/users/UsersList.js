import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersMultiSelectMenu from "./UsersMultiSelectMenu";
import UsersTable from "./UsersTable";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { openEditContactDialog, selectUsers } from "./store/usersSlice";
import { useSnackbar } from "notistack";
import AssignJobToUser from "./AssignJob";

const useStyles = makeStyles({
  button1: {
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "#43a047",
      color: "#e8e4e4",
      transition: "0.3s",
      borderColor: "#43a047",
    },
  },
  button2: {
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "#e53935",
      color: "#e8e4e4",
      transition: "0.3s",
      borderColor: "#e53935",
    },
  },
});

function UsersList(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const contacts = useSelector(selectUsers);
  const searchText = useSelector(({ usersApp }) => usersApp.users.searchText);
  const user = useSelector(({ usersApp }) => usersApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

          return (
            selectedFlatRows.length > 0 && (
              <UsersMultiSelectMenu selectedContactIds={selectedRowIds} />
            )
          );
        },
        accessor: "avatar",
        Cell: ({ row }) => {
          return (
            <Avatar
              // className="mx-8"
              // alt={row.original.name}
              // src={row.original.avatar}
              className="mx-8"
              alt={row.original.name}
              src={row.original?.avatar?.url}
              style={{ height: "7rem", width: "7rem" }}
            />
          );
        },
        className: "justify-center",
        width: 64,
        sortable: false,
      },
      {
        Header: "First Name",
        accessor: "firstName",
        className: "font-medium",
        sortable: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        className: "font-medium",
        sortable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        sortable: true,
      },
      {
        Header: "Phone",
        accessor: "phoneNumber",
        sortable: true,
      },
      {
        id: "action",
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                // dispatch(approveUser(row.original.id));
                // dispatch(toggleStarredContact(row.original.id));
                // handleClick(ev);
                // dispatch(toggleStarredContact(row.original.id));
              }}
            >
              <Icon>
                <AssignJobToUser id={row.original.id} />
              </Icon>
            </IconButton>
            {/* <AssignJobToUser /> */}
            {/* <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                // dispatch(rejectUser(row.original.id));
                // rejectHandleClick(ev);
              }}
              className={classes.button2}
            >
              <Icon>delete</Icon>
            </IconButton> */}
          </div>
        ),
      },
    ],
    [dispatch, user.starred]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no Users!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
    >
      <UsersTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditContactDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default UsersList;
