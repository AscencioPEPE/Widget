import React from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import { QueryClientProvider } from "react-query";
import WidgetList from "./components/WidgetList";
import { queryClient } from "./lib/queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <WidgetList />
      </Stack>
    </QueryClientProvider>
  );
};

export default App;
