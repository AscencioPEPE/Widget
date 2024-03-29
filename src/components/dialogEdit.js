import { Dialog, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const DialogEdit = ({ widget, onSubmit, onClose, open }) => {
  const { name, price: initialPrice, description: initialDescription } = widget;

  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: name,
    },
  });

  const onSubmitForm = async (data) => {
    try {
      await onSubmit(name, data);
      onClose();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="outlined" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Dialog>
  );
};
