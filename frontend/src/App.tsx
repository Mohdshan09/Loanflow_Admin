import AuthInitializer from "./lib/AuthInitializer.";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AuthInitializer />
      <AppRoutes />
    </>
  );
}

export default App;