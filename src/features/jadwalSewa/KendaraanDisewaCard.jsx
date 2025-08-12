import Card from "../../ui/Card";

function KendaraanDisewaCard({ data }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3`}>
      {data.map((kendaraan) => (
        <Card data={kendaraan} key={kendaraan.id} isButtonShow={false} />
      ))}
    </div>
  );
}

export default KendaraanDisewaCard;
