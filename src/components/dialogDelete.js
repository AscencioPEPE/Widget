import { Dialog, DialogTitle, Button, DialogContentText } from "@mui/material";

export const DialogDelete = ({ widget, onSubmit, onClose, open }) => {
  const { name, price, description } = widget;

  const onSubmitForm = async () => {
    try {
      await onSubmit(name);
      onClose();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
        <DialogContentText>{price}</DialogContentText>
        <DialogContentText>{description}</DialogContentText>
        <Button
          type="submit"
          variant="outlined"
          color="error"
          onClick={onSubmitForm}
        >
          Delete
        </Button>
    </Dialog>
  );
};
