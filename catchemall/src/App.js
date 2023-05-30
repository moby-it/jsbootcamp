import { Game } from "./Game.js";
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Game />
      </QueryClientProvider>
    </>
  )
}

export default App;
