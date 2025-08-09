import Card from "../../ui/Card";

function KendaraanDisewaCard({ data, column }) {
  return (
    <div className={`grid gap-4`} style={{ gridTemplateColumns: column }}>
      {data.map((kendaraan) => (
        <Card data={kendaraan} key={kendaraan.id} isButtonShow={false} />
      ))}
    </div>
  );
}

export default KendaraanDisewaCard;
