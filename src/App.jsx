import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { AuthContextProvider } from "./contexts/AuthContext/AuthContextProvider";
import { CorsiContextProvider } from "./contexts/CorsiContext/CorsiContextProvider";
import { UtentiContextProvider } from "./contexts/UtentiContext/UtentiContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <CorsiContextProvider>
        <UtentiContextProvider>

          <RouterProvider router={router} />
          
        </UtentiContextProvider>
      </CorsiContextProvider>
    </AuthContextProvider>
  );
}

export default App;
