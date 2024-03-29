import { useQuery, useMutation } from "react-query";
import {
  listWidgets,
  createWidget,
  updateWidgetByName,
  deleteWidgetByName,
  getWidgetByName,
} from "../lib/apiConnect";
import { queryClient } from "../lib/queryClient";

/**
 * Retrieve list of widgets
 * @return {Array<{name: string, price: number, description: string}>}
 */
export const useListWidgetQuery = () =>
  useQuery({ queryKey: ["widget"], queryFn: listWidgets });

/**
 * Retrieve a widget by name
 * @param {string} name - The name of the widget to retrieve
 * @return {Promise<{name: string, price: number, description: string}>}
 */
export const useSearchByNameQuery = (name) => {
  return useQuery({
    queryKey: ["widget", name],
    queryFn: () => getWidgetByName(name),
    enabled: name.length > 0 ? true : false,
    cacheTime: 0,
  });
};

/**
 * Create a new widget
 * @return {MutationTuple} A tuple containing the mutation function and mutation state
 */
export const useCreateWidgetQuery = () => {
  return useMutation({
    queryKey: ["widget"],
    mutationFn: createWidget,
    onError: () => {
      // If the API fails, the previous data is returned
      queryClient.setQueryData(["widget"]);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["widget"] }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["widget"]);
    },
  });
};

/**
 * Update an existing widget by its name
 * @return {MutationTuple} A tuple containing the mutation function and mutation state
 */
export const useUpdateWidgetQuery = () => {
  return useMutation({
    queryKey: ["widget"],
    mutationFn: updateWidgetByName,
    onError: () => {
      // If the API fails, the previous data is returned
      queryClient.setQueryData(["widget"]);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["widget"] }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["widget"]);
    },
  });
};

/**
 * Delete a widget by its name
 * @return {MutationTuple} A tuple containing the mutation function and mutation state
 */
export const useDeleteWidgetQuery = () => {
  return useMutation({
    queryKey: ["widget"],
    mutationFn: deleteWidgetByName,
    onError: () => {
      // If the API fails, the previous data is returned
      queryClient.setQueryData(["widget"]);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["widget"] }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["widget"]);
    },
  });
};

