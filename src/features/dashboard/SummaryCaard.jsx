const colorCard = {
  red: {
    solid: "bg-acent-red/50",
    soft: "bg-acent-red/10",
  },
  green: {
    solid: "bg-acent-green/50",
    soft: "bg-acent-green/10",
  },
  blue: {
    solid: "bg-primary/50",
    soft: "bg-primary/10",
  },
  // tambahkan sesuai kebutuhan
};
function SummaryCaard({ color, variantColor, angka, keterangan }) {
  return (
    <div
      className={`${colorCard[color][variantColor]} bg-opacity-10 relative flex h-[250px] w-full flex-col overflow-hidden rounded-2xl p-8`}
    >
      <div>
        <div
          className={`absolute -top-15 -left-15 rounded-full ${colorCard[color]["solid"]} h-[150px] w-[150px]`}
        ></div>
        <div
          className={`absolute -top-30 -right-20 rounded-full ${colorCard[color]["solid"]} h-[150px] w-[150px]`}
        ></div>
        <div
          className={`absolute -right-20 -bottom-5 rounded-full ${colorCard[color]["solid"]} h-[150px] w-[150px]`}
        ></div>
        <div
          className={`absolute -right-5 -bottom-20 rounded-full ${colorCard[color]["solid"]} h-[150px] w-[150px]`}
        ></div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <p className="text-netral-800 text-5xl font-bold">{angka}</p>
        <p className="text-netral-800 font-medium">{keterangan}</p>
      </div>
    </div>
  );
}

export default SummaryCaard;
