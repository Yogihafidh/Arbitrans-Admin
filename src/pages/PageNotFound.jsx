import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-netral-100 flex h-screen flex-col items-center justify-center gap-4">
      <img src="../../public/animation.png" />

      <div className="text-center">
        <h1 className="text-netral-900 text-3xl">Halaman tidak ditemukan!</h1>
        <p
          className="text-primary cursor-pointer underline"
          onClick={() => navigate(-1)}
        >
          Segera kembali!
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
