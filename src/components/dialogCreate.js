import { Dialog, DialogTitle, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

export const DialogCreate = ({ onSubmit, onClose, open }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmitForm = async (data) => {
    try {
      await onSubmit(data);
      onClose(); // Cierra el diálogo al enviar el formulario exitosamente
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Widget</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          {...register("name", {
            required: true,
            pattern: {
              value: /.{3,100}/,
              message: "Name must be between 3 and 100 characters",
            },
          })}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        <TextField
          {...register("price", {
            required: true,
            pattern: {
              value: /^\d{0,4}(\.\d{1,2})?$/,
              message:
                "Price must be a number with up to 2 decimal places between $1.00 and $20000.00",
            },
          })}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          error={!!errors.price}
          helperText={errors.price ? errors.price.message : ""}
        />
        <TextField
          {...register("description", {
            required: true,
            pattern: {
              value: /.{5,1000}/,
              message: "Description must be between 5 and 1000 characters",
            },
          })}
          id="outlined-basic"
          label="Description"
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ""}
        />
        <Button type="submit" variant="outlined" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Dialog>
  );
};
