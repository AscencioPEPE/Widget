import { api } from "./connection";

/**
 * Retrieves the list of widgets.
 * @returns {Promise<Array>} The list of widgets.
 */
export const listWidgets = async () => {
  const response = await api({
    url: "",
    method: "GET",
  });
  return response.data;
};

/**
 * Creates a new widget.
 * @param {Object} widget - The widget data to create.
 * @returns {Promise<Object>} The created widget data.
 */
export const createWidget = async (widget) => {
  const { data } = await api({
    url: "",
    method: "POST",
    data: widget,
  });

  return data;
};

/**
 * Retrieves a widget by its name.
 * @param {string} name - The name of the widget to retrieve.
 * @returns {Promise<Object>} The retrieved widget data.
 */
export const getWidgetByName = async (name) => {
  const { data } = await api({
    url: `/${name}`,
    method: "GET",
  });

  return data;
};

/**
 * Updates a widget by its name.
 * @param {Object} params - The parameters for updating the widget.
 * @param {string} params.widgetName - The name of the widget to update.
 * @param {Object} params.widget - The updated widget data.
 * @returns {Promise<Object>} The updated widget data.
 */
export const updateWidgetByName = async ({widgetName, widget}) => {
  const { data } = await api({
    url: `/${widgetName}`,
    method: "PUT",
    data: widget
  });

  return data;
};

/**
 * Deletes a widget by its name.
 * @param {string} widgetName - The name of the widget to delete.
 * @returns {Promise<Object>} The response data after deleting the widget.
 */
export const deleteWidgetByName = async (widgetName) => {
  const response = await api({
    url: `/${widgetName}`,
    method: "DELETE",
  });

  return response;
};
