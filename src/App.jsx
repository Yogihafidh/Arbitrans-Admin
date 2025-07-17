import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import { Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import RentalKendaraan from "./pages/RentalKendaraan";
import Pelanggan from "./pages/Pelanggan";
import JadwalSewa from "./pages/JadwalSewa";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
