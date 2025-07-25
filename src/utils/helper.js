export function convertRupiah(nominal) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(nominal);
}

export function convertDateFormat(date) {
  return String(date).replaceAll("-", "/");
}
