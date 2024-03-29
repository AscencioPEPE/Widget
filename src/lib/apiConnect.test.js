import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from "axios-mock-adapter";
import { api } from "./connection";
import { useListWidgetQuery, useSearchByNameQuery, useCreateWidgetQuery, useUpdateWidgetQuery, useDeleteWidgetQuery } from "./widgetsAPI";

describe("Widgets API Queries", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should fetch all widgets using useListWidgetQuery", async () => {
    const mockResponse = [{ id: 1, name: "Widget 1" }, { id: 2, name: "Widget 2" }];

    mock.onGet("/").reply(200, mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useListWidgetQuery());

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockResponse);
  });

  it("should fetch a widget by name using useSearchByNameQuery", async () => {
    const widgetName = "WidgetName";
    const mockResponse = { id: 1, name: widgetName, description: "Widget Description", price: 20.99 };

    mock.onGet(`/${widgetName}`).reply(200, mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useSearchByNameQuery(widgetName));

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockResponse);
  });

  it("should create a new widget using useCreateWidgetQuery", async () => {
    const widgetData = { name: "New Widget", description: "Description", price: 10.99 };
    const mockResponse = { id: 3, ...widgetData };

    mock.onPost("/").reply(201, mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useCreateWidgetQuery());

    await act(async () => {
      result.current.mutate(widgetData);
      await waitForNextUpdate();
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  it("should update a widget by name using useUpdateWidgetQuery", async () => {
    const widgetName = "WidgetName";
    const updatedWidgetData = { description: "Updated Description", price: 30.99 };
    const mockResponse = { id: 1, name: widgetName, ...updatedWidgetData };

    mock.onPut(`/${widgetName}`).reply(200, mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useUpdateWidgetQuery());

    await act(async () => {
      result.current.mutate({ widgetName, widget: updatedWidgetData });
      await waitForNextUpdate();
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  it("should delete a widget by name using useDeleteWidgetQuery", async () => {
    const widgetName = "WidgetName";

    mock.onDelete(`/${widgetName}`).reply(204);

    const { result, waitForNextUpdate } = renderHook(() => useDeleteWidgetQuery());

    await act(async () => {
      result.current.mutate(widgetName);
      await waitForNextUpdate();
    });

    expect(result.current.isSuccess).toBe(true);
  });
});
