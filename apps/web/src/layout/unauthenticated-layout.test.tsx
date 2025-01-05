import { screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import UnauthenticatedLayout from "./unauthenticated-layout";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("UnauthenticatedLayout", () => {
  it("render main content without navbar", () => {
    render(<UnauthenticatedLayout>Hi</UnauthenticatedLayout>);

    const container = screen.getByRole("main");

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(within(container).getByText("Hi")).toBeInTheDocument();
  });
});
