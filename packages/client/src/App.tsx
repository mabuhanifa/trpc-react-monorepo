import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";
import { trpc } from "./lib/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    });
  });

  const invalidate = () => {};

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <div className="max-w-xl mx-auto">
          <div className="text-center text-3xl font-bold text-gray-700">
            <h1>Vite + React | Express | tRPC</h1>
            <h3>npm workspaces</h3>
          </div>
          <div className="max-w-md mx-auto grid gap-y-4 mt-8">
            <ListTodos />
            <AddTodo />
            {/* <GetTodoById /> */}
          </div>
        </div>
      </trpc.Provider>
    </QueryClientProvider>
  );
}

export default App;
