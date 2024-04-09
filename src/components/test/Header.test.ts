import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test } from 'vitest'
import { Header } from "../Header";

describe("Header component", () => {
  test("renders correctly", () => {
    render(<Header />);
    
    // Assert that the logo is rendered
    const logo = screen.getByAltText("logo");
    test.expect(logo).toBeInTheDocument();

    // Assert that the navigation links are rendered
    const formLink = screen.getByText("Formulari");
    test.expect(formLink).toBeInTheDocument();

    const dashboardLink = screen.getByText("Dashboard");
    test.expect(dashboardLink).toBeInTheDocument();

    const uploadButton = screen.getByText("Pujar Excel");
    test.expect(uploadButton).toBeInTheDocument();

    const downloadButton = screen.getByText("Descarregar");
    test.expect(downloadButton).toBeInTheDocument();

    // Assert that the user name is rendered
    const userName = screen.getByText(/Benvingut\/da/i);
    test.expect(userName).toBeInTheDocument();

    // Assert that the logout button is rendered
    const logoutButton = screen.getByText("Tancar Sessió");
    test.expect(logoutButton).toBeInTheDocument();
  });

  test("handles logout correctly", () => {
    // Mock the necessary functions and localStorage
    const mockRemoveItem = jest.spyOn(localStorage, "removeItem");
    const mockSetCurrentUser = jest.fn();
    const mockNavigate = jest.fn();
    jest.spyOn(React, "useContext").mockReturnValue([{}, mockSetCurrentUser]);
    jest.spyOn(Router, "useNavigate").mockReturnValue(mockNavigate);

    render(<Header />);

    // Simulate clicking the logout button
    const logoutButton = screen.getByText("Tancar Sessió");
    fireEvent.click(logoutButton);

    // Assert that the necessary functions are called
    test.expect(mockRemoveItem).toHaveBeenCalledWith("token");
    test.expect(mockRemoveItem).toHaveBeenCalledWith("user");
    test.expect(mockSetCurrentUser).toHaveBeenCalledWith({ token: "" });
    test.expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  // Add more tests for handleDownload and handleUpload if needed
});