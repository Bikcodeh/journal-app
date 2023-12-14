import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
const { LoginPage } = require("../../../src/auth/pages/LoginPage");

const mockStartGoogleSignIn = jest.fn();
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn
}))

const storeTest = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
});

describe("Tests for LoginPage", () => {
  test("should show correctly the component", async () => {
    render(
      <Provider store={storeTest}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const texts = await screen.findAllByText("Login");
    expect(texts.length).toBeGreaterThanOrEqual(1);
  });

  test("textField email and password should work properly", () => {
    const emailExample = "email@example.com";
    const passwordExample = "12345678";
    render(
      <Provider store={storeTest}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const emailTextField = screen.getByLabelText("Email");
    const passwordTextField = screen.getByLabelText("Password");
    fireEvent.input(emailTextField, { target: { value: emailExample } });
    fireEvent.input(passwordTextField, { target: { value: passwordExample } });
    expect(
      screen.getByDisplayValue(emailExample, {
        exact: true,
      })
    ).toBeTruthy();
    expect(
      screen.getByDisplayValue(passwordExample, {
        exact: true,
      })
    ).toBeTruthy();
  });

  test('google button should call startGoogleSignIn', () => { 
    render(
        <Provider store={storeTest}>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </Provider>
      );
      const googleBtn = screen.getByLabelText('google-btn');
      fireEvent.click(googleBtn);
      expect(mockStartGoogleSignIn).toHaveBeenCalled();
   });
});
