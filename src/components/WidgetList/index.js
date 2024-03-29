import React, { useState, Fragment } from "react";
import { Grid, Stack, Typography, Button, TextField } from "@mui/material";
import WidgetDisplay from "../WidgetDisplay";
import { DialogCreate } from "../dialogCreate";
import { DialogShow } from "../dialogShow";
import {
  useListWidgetQuery,
  useCreateWidgetQuery,
} from "../../hooks/useWidget";
import { DialogError } from "../dialogError";
import { getWidgetByName } from "../../lib/apiConnect";

const WidgetList = () => {
  const listWidgets = useListWidgetQuery();
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogShow, setOpenDialogShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundedWidget, setFoundedWidget] = useState();
  const [error, setError] = useState(""); 
  const [openDialogError, setOpenDialogError] = useState(false);

  const searchWidgetByName = async (name) => {
    setIsSearching(true);

    try {
      const dataWidget = await getWidgetByName(name);
      setOpenDialogShow(true);
      setFoundedWidget(dataWidget);
    } catch (error) {
      console.log("error: ", error);
      setError("Dosn´t exist a widget with that name")
      setOpenDialogError(true)
      setOpenDialogShow(false)
    } finally {
      setIsSearching(false);
    }
  };

  const { mutateAsync: createWidget, isLoading: isLoadingCreate } =
    useCreateWidgetQuery();

  const handleCloseDialogShow = () => {
    setOpenDialogShow(false);
  };

  const handleSearchButtonClick = () => {
    searchWidgetByName(searchTerm)
  };

  const onSubmitCreate = async (data) => {
    await createWidget(data);
  };

  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
  };

  const handleCloseDialogError = () => {
    // Cierra el diálogo estableciendo openDialog en false
    setOpenDialogError(false);
  };

  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      {!isLoadingCreate && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialogCreate(true)}
          >
            Create your own Widget!!
          </Button>
          {!isSearching && (
            <>
              <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearchButtonClick}
              >
                Search for your Widget!!
              </Button>
            </>
          )}
        </>
      )}
      <DialogCreate
        open={openDialogCreate}
        onSubmit={onSubmitCreate}
        onClose={handleCloseDialogCreate}
      />
      <DialogShow
        open={openDialogShow}
        widget={foundedWidget || {}}
        onClose={handleCloseDialogShow}
      />
      <DialogError
        open={openDialogError}
        onClose={handleCloseDialogError}
        error={error}
      />
      {!listWidgets.isLoading ? (
        <Fragment>
          <Typography sx={{ textAlign: "center" }} variant="h3">
            List of widgets:
          </Typography>
          <Grid
            container
            justifyContent="center"
            spacing={4}
            sx={{ paddingRight: 4, width: "100%" }}
          >
            {listWidgets?.data?.map((widget, key) => (
              <WidgetDisplay
                key={key}
                {...{
                  widget,
                }}
              />
            ))}
          </Grid>
        </Fragment>
      ) : (
        "Loading..."
      )}
    </Stack>
  );
};

export default WidgetList;
