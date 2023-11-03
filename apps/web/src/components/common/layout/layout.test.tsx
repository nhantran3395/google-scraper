import { screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import Layout from "./layout";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Layout", () => {
  it("render main content without navbar", () => {
    render(<Layout>Hi</Layout>);

    const container = screen.getByRole("main");

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(within(container).getByText("Hi")).toBeInTheDocument();
  });
});
