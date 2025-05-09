import AppLayout from "./AppLayout";
import { DataProvider } from "./GlobalState";
import "./App.css";

export default function App() {
  return (
    <DataProvider>
      <AppLayout />
    </DataProvider>
  );
}
