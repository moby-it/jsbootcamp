// import API mocking utilities from Mock Service Worker
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import { AppProviders } from './providers';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/pokemon/caught', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json([]));
  }),
);
// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test("App init", async () => {
  render(
    <AppProviders>
      <App />
    </AppProviders>
  );
  await waitForElementToBeRemoved(screen.queryByText("Loading..."));
  expect(screen.getByTestId("pokercard-list")).toBeTruthy();
});