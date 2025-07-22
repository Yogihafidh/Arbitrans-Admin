import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import { Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import RentalKendaraan from "./pages/RentalKendaraan";
import Pelanggan from "./pages/Pelanggan";
import JadwalSewa from "./pages/JadwalSewa";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="rental" element={<RentalKendaraan />} />
              <Route path="pelanggan" element={<Pelanggan />} />
              <Route path="jadwal" element={<JadwalSewa />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
