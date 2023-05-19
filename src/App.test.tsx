import React from "react";
import { render, screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import App from "./App";

const errorMsg =
  "Error fetching data. Please refresh the page or try again in some time.";

describe("App", () => {
  test("renders loading message initially", () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message when fetching data fails", async () => {
    const mockFetch = jest.fn().mockRejectedValueOnce(new Error("Mock fetch error"));

    global.fetch = mockFetch;

    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText(errorMsg)).toBeInTheDocument()
    );
  });

  test("renders record labels and associated bands", async () => {
    const mockFestivals = [
      {
        name: "Festival 1",
        bands: [
          { name: "Band 1", recordLabel: "Record Label 1" },
          { name: "Band 2", recordLabel: "Record Label 1" },
        ],
      },
      {
        name: "Festival 2",
        bands: [
          { name: "Band 3", recordLabel: "Record Label 2" }
        ],
      },
    ];

    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockFestivals),
    });

    global.fetch = mockFetch;

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(screen.queryByText(errorMsg)).toBeNull();

    expect(screen.getByText("Record Label 1")).toBeInTheDocument();
    expect(screen.getByText("Record Label 2")).toBeInTheDocument();
    expect(screen.getByText("Band 1")).toBeInTheDocument();
    expect(screen.getByText("Band 2")).toBeInTheDocument();
    expect(screen.getByText("Band 3")).toBeInTheDocument();
    expect(screen.getAllByText("Festival 1")).toHaveLength(2);
    expect(screen.getAllByText("Festival 2")).toHaveLength(1);

  });
});