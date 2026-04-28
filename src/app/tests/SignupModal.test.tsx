import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignupModal from "src/components/SignupModal";

test("renders and validates required fields", () => {
  const onClose = jest.fn();
  const onSuccess = jest.fn();
  render(<SignupModal open={true} onClose={onClose} onSuccess={onSuccess} />);
  const createBtn = screen.getByRole("button", { name: /create account/i });
  fireEvent.click(createBtn);
  expect(screen.getByText(/required/i)).toBeInTheDocument();
});
