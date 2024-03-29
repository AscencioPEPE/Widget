import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { DialogEdit } from "../dialogEdit";
import {
  useDeleteWidgetQuery,
  useUpdateWidgetQuery,
} from "../../hooks/useWidget";
import { DialogDelete } from "../dialogDelete";

const DisplayWidget = ({ widget }) => {
  const { mutateAsync: updateWidget, isLoading: isLoadingUpdate } =
    useUpdateWidgetQuery();

  const { mutateAsync: deleteWidget, isLoading: isLoadingDelete } =
    useDeleteWidgetQuery();

  const { description, name, price } = widget;
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  const onSubmitEdit = async (name, data) => {
    try {
      await updateWidget({widgetName:name, widget:data});
    } catch (error) {
      console.log("error :", error);
    } finally {
    }
  };

  const onSubmitDelete = async (name) => {
    try {
      await deleteWidget(name);
    } catch (error) {
      console.log("error :", error);
    } finally {
    }
  };

  return (
    <Grid item xs={6}>
      <Card>
        {isLoadingDelete || isLoadingUpdate ? (
          <p>Loading...</p>
        ) : (
          <CardContent>
            <div>
              <Stack spacing={2}>
                <Typography component="div" gutterBottom variant="h4">
                  {name}
                </Typography>
                <Typography component="div" gutterBottom variant="h5">
                  ${price}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {description}
                </Typography>
                <Stack spacing={2} direction="row">
                  <DialogEdit
                    open={openDialogEdit}
                    widget={widget}
                    onSubmit={onSubmitEdit}
                    onClose={handleCloseDialogEdit}
                  />
                  <Button
                    style={{ width: "100%" }}
                    variant="outlined"
                    onClick={() => {
                      setOpenDialogEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                  <DialogDelete
                    open={openDialogDelete}
                    widget={widget}
                    onSubmit={onSubmitDelete}
                    onClose={handleCloseDialogDelete}
                  />
                  <Button
                    style={{ width: "100%" }}
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setOpenDialogDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </div>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

export default DisplayWidget;
