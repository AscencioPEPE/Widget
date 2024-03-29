import { Dialog, DialogTitle,Button, DialogContentText} from "@mui/material";


export const DialogError = ({open, error, onClose}) => {
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Error"}</DialogTitle>
      <DialogContentText>{error}</DialogContentText>
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
