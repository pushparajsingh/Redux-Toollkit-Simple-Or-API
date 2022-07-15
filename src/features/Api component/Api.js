import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApi, Delete, Update } from "../counter/counterSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Api = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { loading, data, del } = useSelector((state) => state);
  const [ChangeData, setChangeData] = useState("");
  const [Id, setId] = useState();
  const [sta, setSta] = useState(false);

  const handleClose = () => {
    setOpen(false);
    dispatch(Update({ Id, ChangeData }));
    setSta(true);
    //destructing kar ka bajana padaga.
    // window.loading.reload();
  };

  useEffect(() => {
    dispatch(getApi());
  }, [del]);

  function deletePost(id) {
    dispatch(Delete(id));
    setSta(true);
  }

  function updatePost(ids, names) {
    setChangeData(names);
    setId(ids);
    handleOpen();
  }
  if (sta) {
    return <Api />;
  }
  return (
    <div>
      <h1>Api</h1>

      <table
        border="2px"
        align="center"
        cellPadding={"12px"}
        cellSpacing={"0px"}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Image</th>
            <th>createdAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div>loading....</div>
          ) : (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.avatar} alt="image" />
                  </td>
                  <td>{item.createdAt}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deletePost(item.id)}
                    >
                      Delete
                    </Button>{" "}
                    &nbsp;&nbsp;
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => updatePost(item.id, item.name)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot></tfoot>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Now
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              value={ChangeData}
              onChange={(e) => setChangeData(e.target.value)}
            />

            <br />
            <br />
          </Typography>
          <Button onClick={handleClose} variant="outlined">
            Update
          </Button>
        </Box>
      </Modal>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>
    </div>
  );
};
