import { screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthenticatedLayout } from "./authenticated-layout";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("AuthenticatedLayout", () => {
  it("render main content and a navbar on top", () => {
    render(<AuthenticatedLayout>Hi</AuthenticatedLayout>);

    const navBar = screen.getByRole("navigation");
    const content = screen.getByRole("article");

    expect(
      within(navBar).getByRole("link", { name: "Uploads" })
    ).toBeInTheDocument();

    expect(
      within(navBar).getByRole("link", { name: "Keywords" })
    ).toBeInTheDocument();

    expect(within(content).getByText("Hi")).toBeInTheDocument();
  });
});
