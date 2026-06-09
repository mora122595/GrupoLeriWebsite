import "./App.css";
import { Toaster } from "sonner";
import { LanguageProvider } from "./context/LanguageContext";
import Landing from "./pages/Landing";

function App() {
  return (
    <LanguageProvider>
      <Landing />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#040B16",
            color: "#fff",
            border: "1px solid #1E293B",
            borderRadius: "2px",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </LanguageProvider>
  );
}

export default App;
