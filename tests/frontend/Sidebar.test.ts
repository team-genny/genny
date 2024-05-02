import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../../src/frontend/src/components/Sidebar";

describe("Sidebar Component", () => {
  test("renders Sidebar component", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Sidebar Heading
    expect(screen.getByText("Genny")).toBeInTheDocument();

    // Sidebar Links
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Schemas")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
  });

  test("renders active NavLink when route matches", () => {
    render(
      <Router initialEntries={["/schemas"]}>
        <Sidebar />
      </Router>
    );

    const activeLink = screen.getByText("Schemas");

    expect(activeLink).toBeInTheDocument();
    expect(activeLink).toHaveClass("active");
  });

  test("renders pending NavLink when route is pending", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // In this test case, no link should be active or pending since no route is matched.
    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).not.toHaveClass("active");
      expect(link).not.toHaveClass("pending");
    });
  });

  // Add more tests as needed for IconButton and other functionalities.
});
