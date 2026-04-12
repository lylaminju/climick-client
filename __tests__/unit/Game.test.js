import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import store from "../../src/configure/store";

jest.mock("pixi.js", () => {
  const actualPixi = jest.requireActual("pixi.js");
  return {
    ...actualPixi,
    Application: jest.fn().mockImplementation(() => ({
      // mock only the methods you need for testing
      stage: { addChild: jest.fn() },
      renderer: { resize: jest.fn() },
      ticker: { add: jest.fn(), remove: jest.fn() },
      destroy: jest.fn(),
    })),
  };
});

describe.only("When user clicks the player, game starts and", () => {
  it("a timer starts", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/game"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // initial time is 0
    expect().toEqual(0);
  });
  it("HP begins to decrease", () => {});
});

describe("During the game", () => {
  it("when dragging hand or foot far away and one of limbs is fully extended, it is not detached from body", () => {});
  it("When hands and feet are placed on the holds, they don't fall", () => {});
  it("When hands and feet are placed outside of the holds, they fall", () => {});
  it("When user clicks 'Restart', set the time and hp as 0 and reset the player's position", () => {});
});

describe("Game Result", () => {
  const expectGameResult = resultText => {
    expect(screen.getByText(new RegExp(resultText, "i"))).toBeInTheDocument();
    expect(screen.getByText(/Ranking/i)).toBeInTheDocument();
  };

  describe("Player succeeds", () => {
    it("displays 'Success' and shows 'Ranking' when both hands are on the TOP hold", () => {
      expectGameResult("Success");
    });
  });

  describe("Player fails", () => {
    it("displays 'Fail' and shows 'Ranking' if both hands fall off the holds", () => {
      expectGameResult("Fail");
    });
    it("displays 'Fail' and shows 'Ranking' if time runs out", () => {
      expectGameResult("Fail");
    });
    it("displays 'Fail' and shows 'Ranking' if HP reaches zero", () => {
      expectGameResult("Fail");
    });
  });
});

describe("", () => {
  it("", () => {});
  it("", () => {});
});
