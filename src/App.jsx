import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import JadwalSewa from "./pages/JadwalSewa";
import Pelanggan from "./pages/Pelanggan";
import RentalKendaraan from "./pages/RentalKendaraan";
import AppLayout from "./ui/AppLayout";
import Status from "./pages/Status";
import Riwayat from "./pages/Riwayat";

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
              <Route path="pelanggan" element={<Pelanggan />}>
                <Route index element={<Status />} />
                <Route path="riwayat" element={<Riwayat />} />
              </Route>
              <Route path="jadwal" element={<JadwalSewa />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            duration: 4000,
            success: {
              duration: 3000,
              style: {
                backgroundColor: "#FFFFFF",
                color: "#065F46",
                border: "1px solid #10B981",
              },
            },
            error: {
              duration: 5000,
              style: {
                backgroundColor: "#FFFFFF",
                color: "#991B1B",
                border: "1px solid #EF4444",
              },
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#F9FAFB",
              color: "#1F2937",
            },
          }}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;
