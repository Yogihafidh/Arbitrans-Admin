import { differenceInCalendarDays } from "date-fns";
import Button from "./Button";
import { convertRupiah } from "../utils/helper";

const status = {
  Tersedia: "bg-acent-green/10 border-acent-green text-acent-green",
  Disewa: "bg-acent-red/10 border-acent-red text-acent-red",
  Perawatan: "bg-acent-orange/10 border-acent-orange text-acent-orange",
};

function Card({ booking }) {
  console.log(status[booking.kendaraan.status_kendaraan]);
  console.log(booking);
  const totalHarga =
    booking.kendaraan.harga_sewa *
    differenceInCalendarDays(booking.tanggal_akhir, booking.tanggal_mulai);

  return (
    <div className="border-netral-300 rounded-2xl border p-4">
      <div className="relative w-full">
        <img
          className={`h-[240px] w-full ${booking?.kendaraan?.imageKendaraan?.[0]?.url_gambar ? "object-cover" : ""}`}
          src={
            booking?.kendaraan?.imageKendaraan?.[0]?.url_gambar ||
            "../../public/defaultImage.jpg"
          }
        />
        <span
          className={`absolute top-4 right-4 rounded-lg border-2 px-3 py-1 text-sm ${status[booking.kendaraan.status_kendaraan]}`}
        >
          {booking.kendaraan.status_kendaraan}
        </span>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <p className="font-semibold">{booking.kendaraan.nama_kendaraan}</p>
        <p className="text-netral-700 text-sm">{booking.nama_pelanggan}</p>
        <p className="text-netral-700 text-sm">{convertRupiah(totalHarga)}</p>
        <div className="flex gap-2">
          <Button type="primary" text="Ubah Status" className="w-full" />
          <Button
            type="logout"
            text="Batal"
            className="bg-acent-red/10 border-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
