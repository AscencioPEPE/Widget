import { Dialog, DialogTitle,Button, DialogContentText} from "@mui/material";


export const DialogShow = ({open, widget, onClose}) => {
  const {name,price, description} = widget
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContentText>{price}</DialogContentText>
        <DialogContentText>{description}</DialogContentText>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
        >
          Cerrar
        </Button>
    </Dialog>
  );
};
