import { addDays, differenceInCalendarDays, subDays } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useKendaraan } from "../../hooks/useKendaraan";
import { useCreateRental } from "./useCreatePelanggan";
import { useRental } from "../../hooks/useRental";
import { useEditRental } from "./useEditRental";
import { convertRupiah } from "../../utils/helper";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import Row from "../../ui/Row";
import DateInput from "../../ui/DateInput";
import TextArea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Loading from "../../ui/Loading";

const DOCUMENT_UPLOADS = [
  {
    key: "ktpPenyewa",
    label: "KTP Penyewa *",
    column: "url_ktp_penyewa",
    bucket: "ktpPenyewa",
    required: true,
    note: "Format: JPG, JPEG, PNG, HEIC, HEIF, WEBP",
  },
  {
    key: "ktpPenjamin",
    label: "KTP Penjamin (Saudara/Teman) *",
    column: "url_ktp_penjamin",
    bucket: "ktpPenjamin",
    required: true,
    note: "Format: JPG, JPEG, PNG, HEIC, HEIF, WEBP",
  },
  {
    key: "idKaryawan",
    label: "ID Karyawan / NPWP (AK TP)",
    column: "url_id_karyawan",
    bucket: "idKaryawan",
    required: false,
    note: "Format: JPG, JPEG, PNG, HEIC, HEIF, WEBP",
  },
  {
    key: "simA",
    label: "SIM aktif *",
    column: "url_sim_a",
    bucket: "simA",
    required: true,
    note: "Format: JPG, JPEG, PNG, HEIC, HEIF, WEBP",
  },
  {
    key: "tiketKereta",
    label: "Tiket Kereta PP (bagi wisatawan)",
    column: "url_tiket_kereta",
    bucket: "tiketKereta",
    required: false,
    note: "Format: JPG, JPEG, PNG, HEIC, HEIF, WEBP",
  },
];

const ACCEPTED_DOCUMENT_TYPES =
  "image/jpeg,image/png,image/jpg,image/heic,image/heif,image/webp";

function createInitialDocumentsState() {
  return DOCUMENT_UPLOADS.reduce((acc, doc) => {
    acc[doc.key] = {
      file: null,
      previewUrl: "",
      uploading: false,
      error: "",
      path: "",
      uploadedUrl: "",
    };
    return acc;
  }, {});
}

function PelangganForm({ dataEdit = {}, onCloseModal, ref }) {
  // Check if edit session
  const isEditSession = Boolean(dataEdit.id);
  const defaultValues = useMemo(() => {
    const base = {
      nama_pelanggan: "",
      nik: "",
      no_telephone: "",
      alamat: "",
      id_kendaraan: "",
      tanggal_mulai: "",
      tanggal_akhir: "",
      lokasi_pengambilan: "",
      lokasi_pengembalian: "",
      jenis_sewa: "",
      helm: 0,
      mantel: 0,
      waktu_pengambilan: "",
      waktu_pengembalian: "",
    };

    if (!isEditSession) return base;

    return {
      ...base,
      nama_pelanggan: dataEdit.namaPelanggan || "",
      nik: dataEdit.nik || "",
      no_telephone: dataEdit.noTelephone || "",
      alamat: dataEdit.alamat || "",
      id_kendaraan: dataEdit.idKendaraan || "",
      tanggal_mulai: dataEdit.tanggalMulai || "",
      tanggal_akhir: dataEdit.tanggalAkhir || "",
      lokasi_pengambilan: dataEdit.lokasiPengambilan || "",
      lokasi_pengembalian: dataEdit.lokasiPengembalian || "",
      jenis_sewa: dataEdit.jenisSewa || "",
      helm: dataEdit.helm ?? 0,
      mantel: dataEdit.mantel ?? 0,
      waktu_pengambilan: dataEdit.waktuPengambilan
        ? String(dataEdit.waktuPengambilan).slice(0, 5)
        : "",
      waktu_pengembalian: dataEdit.waktuPengembalian
        ? String(dataEdit.waktuPengembalian).slice(0, 5)
        : "",
    };
  }, [isEditSession, dataEdit]);

  const methods = useForm({
    defaultValues,
  });
  const { register, handleSubmit, reset, control } = methods;

  const [documents, setDocuments] = useState(() =>
    createInitialDocumentsState(),
  );

  function resetDocuments() {
    setDocuments((prev) => {
      Object.values(prev || {}).forEach((docState) => {
        if (docState?.previewUrl) URL.revokeObjectURL(docState.previewUrl);
      });
      return createInitialDocumentsState();
    });
  }

  function handleReset() {
    reset();
    if (!isEditSession) resetDocuments();
  }

  useEffect(() => {
    if (!isEditSession) {
      resetDocuments();
    }
  }, [isEditSession]);

  useEffect(() => {
    return () => {
      Object.values(documents).forEach((docState) => {
        if (docState?.previewUrl) URL.revokeObjectURL(docState.previewUrl);
      });
    };
  }, [documents]);

  const { isCreating, createRental } = useCreateRental();
  const { isEdit, editRental } = useEditRental();
  const { kendaraan = [], isLoading: kendaraanLoading } = useKendaraan();
  const { rental = [], isLoading: rentalLoading } = useRental([
    "Disewa",
    "Belum Dibayar",
    "Telat",
  ]);
  const isLoading = kendaraanLoading || rentalLoading || isCreating || isEdit;

  const kendaraanSelectValue = kendaraan.map((item) => ({
    value: item.id,
    label: item.namaKendaraan,
  }));

  // Disable date Logic
  const tanggalAwal = useWatch({
    control,
    name: "tanggal_mulai",
  });

  const tanggalAkhir = useWatch({
    control,
    name: "tanggal_akhir",
  });
  const jenisSewaValue =
    useWatch({
      control,
      name: "jenis_sewa",
    }) || "";

  const helmValue = useWatch({
    control,
    name: "helm",
  });

  const mantelValue = useWatch({
    control,
    name: "mantel",
  });

  const idKendaraan =
    useWatch({
      control,
      name: "id_kendaraan",
    }) || 0;

  const intervalDateRental = rental.filter(
    (item) => Number(item.idKendaraan) === Number(idKendaraan),
  );

  const dateRental = intervalDateRental.map((date) => ({
    start: subDays(date.tanggalMulai, 1),
    end: date.tanggalAkhir,
  }));

  const kendaraanSelect = kendaraan.filter(
    (item) => item.id === Number(idKendaraan),
  )[0];

  const kendaraanPrice = Number(
    kendaraanSelect?.hargaSewa ?? dataEdit?.hargaSewa ?? 0,
  );
  const hasDateRange = Boolean(tanggalAwal && tanggalAkhir);
  const rentalDuration = hasDateRange
    ? Math.max(differenceInCalendarDays(tanggalAkhir, tanggalAwal), 0)
    : 0;
  const storedTotal = Number(dataEdit?.totalHarga ?? 0);

  const jenisKendaraanAktif =
    kendaraanSelect?.jenisKendaraan || dataEdit?.jenisKendaraan || "";
  const normalizedJenis = jenisKendaraanAktif.toLowerCase();
  const isMobil = normalizedJenis === "mobil";
  const isMotor = normalizedJenis === "motor";

  const jenisSewaOptions = [
    { value: "Dengan Sopir", label: "Dengan Sopir" },
    { value: "Tanpa Sopir", label: "Tanpa Sopir" },
  ];

  const DRIVER_FEE_PER_DAY = 250000;
  const ADDON_FEE_PER_DAY = 5000;
  const effectiveRentalDays = hasDateRange ? Math.max(rentalDuration, 1) : 0;
  const sewaKendaraanCost =
    kendaraanPrice && effectiveRentalDays
      ? kendaraanPrice * effectiveRentalDays
      : 0;
  const includeDriver = isMobil && jenisSewaValue === "Dengan Sopir";
  const driverCost = includeDriver
    ? DRIVER_FEE_PER_DAY * effectiveRentalDays
    : 0;
  const numericHelm = Number(helmValue ?? 0);
  const numericMantel = Number(mantelValue ?? 0);
  const helmCost =
    isMotor && effectiveRentalDays
      ? numericHelm * ADDON_FEE_PER_DAY * effectiveRentalDays
      : 0;
  const mantelCost =
    isMotor && effectiveRentalDays
      ? numericMantel * ADDON_FEE_PER_DAY * effectiveRentalDays
      : 0;
  const computedTotalCost =
    sewaKendaraanCost + driverCost + helmCost + mantelCost;
  const effectiveTotalCost =
    computedTotalCost > 0 ? computedTotalCost : storedTotal;
  const totalHargaFormatted = effectiveTotalCost
    ? convertRupiah(effectiveTotalCost)
    : "-";

  const toDateInstance = (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const tanggalMulaiDate = toDateInstance(
    tanggalAwal || dataEdit?.tanggalMulai,
  );
  const tanggalAkhirDate = toDateInstance(
    tanggalAkhir || dataEdit?.tanggalAkhir,
  );

  const formatLongDate = (value) => {
    if (!value) return "-";
    return value.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const durationLabel = effectiveRentalDays
    ? `${effectiveRentalDays} hari`
    : "-";

  const isUploadingDocuments =
    !isEditSession &&
    DOCUMENT_UPLOADS.some((doc) => documents[doc.key]?.uploading);

  const normalizeNumber = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    return Number(value);
  };

  function handleDocumentSelect(key, file) {
    if (!file) return;
    setDocuments((prev) => {
      const previous = prev[key];
      if (previous?.previewUrl) URL.revokeObjectURL(previous.previewUrl);
      return {
        ...prev,
        [key]: {
          ...previous,
          file,
          previewUrl: URL.createObjectURL(file),
          error: "",
          path: "",
          uploadedUrl: "",
        },
      };
    });
  }

  async function uploadDocuments() {
    const uploadedColumns = {};

    for (const doc of DOCUMENT_UPLOADS) {
      const docState = documents[doc.key];
      if (!docState?.file) {
        if (doc.required) {
          throw new Error(`${doc.label} wajib diunggah`);
        }
        continue;
      }

      setDocuments((prev) => ({
        ...prev,
        [doc.key]: { ...prev[doc.key], uploading: true, error: "" },
      }));

      const filePath = generateDocumentFileName(doc.key, docState.file.name);
      const { error: uploadError } = await supabase.storage
        .from(doc.bucket)
        .upload(filePath, docState.file);

      if (uploadError) {
        setDocuments((prev) => ({
          ...prev,
          [doc.key]: {
            ...prev[doc.key],
            uploading: false,
            error: "Gagal mengunggah dokumen, coba lagi.",
          },
        }));
        throw uploadError;
      }

      const { data: publicData } = supabase.storage
        .from(doc.bucket)
        .getPublicUrl(filePath);

      uploadedColumns[doc.column] = publicData?.publicUrl ?? "";

      setDocuments((prev) => ({
        ...prev,
        [doc.key]: {
          ...prev[doc.key],
          uploading: false,
          error: "",
          path: filePath,
          uploadedUrl: publicData?.publicUrl ?? "",
        },
      }));
    }

    return uploadedColumns;
  }

  async function onSubmit(data) {
    if (!isEditSession) {
      const missingDocument = DOCUMENT_UPLOADS.find(
        (doc) => doc.required && !documents[doc.key]?.file,
      );

      if (missingDocument) {
        toast.error(`${missingDocument.label} wajib diunggah`);
        return;
      }
    }

    let documentColumnValues = {};
    if (!isEditSession) {
      try {
        const uploadedDocumentUrls = await uploadDocuments();
        documentColumnValues = DOCUMENT_UPLOADS.reduce((acc, doc) => {
          acc[doc.column] = uploadedDocumentUrls[doc.column] ?? null;
          return acc;
        }, {});
      } catch (error) {
        console.error("Gagal mengunggah dokumen:", error);
        toast.error(
          "Gagal mengunggah dokumen, periksa koneksi Anda dan coba lagi.",
        );
        return;
      }
    }

    const normalizedJenisSewa =
      isMobil && data.jenis_sewa ? data.jenis_sewa : null;

    const payload = {
      ...data,
      jenis_sewa: normalizedJenisSewa,
      total_harga: effectiveTotalCost || 0,
      ...documentColumnValues,
    };

    if (payload.helm !== undefined)
      payload.helm = normalizeNumber(payload.helm);
    if (payload.mantel !== undefined)
      payload.mantel = normalizeNumber(payload.mantel);

    if (isEditSession)
      editRental(
        { id: dataEdit.id, ...payload },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createRental(
        { status: "Belum Dibayar", ...payload },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
            resetDocuments();
          },
        },
      );
  }

  if (isEditSession && kendaraan.length === 0) return <Loading />;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <Form.Header
          formName={isEditSession ? "Edit Pelanggan" : "Tambah Pelanggan"}
          onClose={() => {
            onCloseModal?.();
          }}
        />
        <Form.Body>
          <Form.Row label="Name Pelanggan" name="nama_pelanggan">
            <Input
              disabled={isLoading}
              inputClass="w-full"
              placeholder="Masukan nomer telephone anda"
              {...register("nama_pelanggan", {
                required: "Nama pelanggan wajib diisi!",
                minLength: {
                  value: 1,
                  message: "Nama minimal 1 karakter",
                },
                maxLength: {
                  value: 150,
                  message: "Nama maksimal 150 karakter",
                },
              })}
            />
          </Form.Row>

          <Form.Row label="Nomer Induk Kependudukan (NIK)" name="nik">
            <Input
              disabled={isLoading}
              placeholder="Masukan NIK pelanggan"
              type="number"
              inputClass="w-full"
              {...register("nik", {
                required: "NIK wajib diisi",
                minLength: {
                  value: 10,
                  message: "NIK tidak boleh kurang dari 10",
                },
                maxLength: {
                  value: 15,
                  message: "NIK tidak boleh lebih dari 15",
                },
              })}
            />
          </Form.Row>

          <Form.Row label="Nomer Telephone" name="no_telephone">
            <Input
              disabled={isLoading}
              placeholder="Masukan nama pelanggan"
              type="number"
              inputClass="w-full"
              {...register("no_telephone", {
                required: "Nomer telephone wajib diisi",
                minLength: {
                  value: 6,
                  message: "Nomer telephone tidak boleh kurang dari 6",
                },
                maxLength: {
                  value: 15,
                  message: "Nomer telephone tidak boleh lebih dari 15",
                },
              })}
            />
          </Form.Row>

          <Form.Row label="Alamat" name="alamat">
            <TextArea
              placeholder="Masukan alamat"
              rows={4}
              {...register("alamat", {
                required: "Alamat wajib diisi",
                minLength: {
                  value: 5,
                  message: "Nama minimal 5 karakter",
                },
                maxLength: {
                  value: 1000,
                  message: "Nama maksimal 1000 karakter",
                },
              })}
            />
          </Form.Row>

          <Form.Row label="Nama Kendaraan" name="id_kendaraan">
            <SelectInput
              disabled={isLoading}
              placeholder="Pilih nama kendaraan terlebih dahulu"
              options={kendaraanSelectValue}
              {...register("id_kendaraan", {
                required: "Kendaraan wajib dipilih",
              })}
            />
          </Form.Row>

          <Row>
            <Form.Row label="Tanggal awal sewa" name="tanggal_mulai">
              <Controller
                name="tanggal_mulai"
                control={control}
                rules={{
                  required: "Pilih tanggal awal rental terlebih dahulu",
                }}
                render={({ field }) => (
                  <DateInput
                    disabled={isLoading}
                    control={control}
                    placeholderText="Pilih tanggal awal"
                    field={field}
                    excludeDateIntervals={dateRental}
                  />
                )}
              />
            </Form.Row>
            <Form.Row label="Tanggal akhir sewa" name="tanggal_akhir">
              <Controller
                name="tanggal_akhir"
                control={control}
                rules={{
                  required: "Pilih tanggal akhir rental terlebih dahulu",
                }}
                render={({ field }) => (
                  <DateInput
                    control={control}
                    placeholderText="Pilih tanggal akhir"
                    field={field}
                    disabled={!tanggalAwal || isLoading}
                    minDate={tanggalAwal ? addDays(tanggalAwal, 1) : null}
                  />
                )}
              />
            </Form.Row>
          </Row>

          <Row>
            <Form.Row label="Lokasi Pengambilan" name="lokasi_pengambilan">
              <Input
                disabled={isLoading}
                placeholder="Masukan lokasi pengambilan"
                {...register("lokasi_pengambilan")}
              />
            </Form.Row>
            <Form.Row label="Lokasi Pengembalian" name="lokasi_pengembalian">
              <Input
                disabled={isLoading}
                placeholder="Masukan lokasi pengembalian"
                {...register("lokasi_pengembalian")}
              />
            </Form.Row>
          </Row>

          <Row>
            <Form.Row label="Waktu Pengambilan" name="waktu_pengambilan">
              <Input
                type="time"
                disabled={isLoading}
                {...register("waktu_pengambilan")}
              />
            </Form.Row>
            <Form.Row label="Waktu Pengembalian" name="waktu_pengembalian">
              <Input
                type="time"
                disabled={isLoading}
                {...register("waktu_pengembalian")}
              />
            </Form.Row>
          </Row>

          {isMobil && (
            <Form.Row label="Jenis Sewa" name="jenis_sewa">
              <SelectInput
                disabled={isLoading}
                placeholder="Pilih jenis sewa"
                options={jenisSewaOptions}
                {...register("jenis_sewa")}
              />
            </Form.Row>
          )}

          {isMotor && (
            <div className="border-netral-200 rounded-lg border bg-white p-6">
              <h3 className="text-netral-900 mb-4 text-lg font-semibold">
                Tambahan
              </h3>
              <div className="grid grid-cols-2 items-center gap-4 max-md:grid-cols-1">
                <Controller
                  name="helm"
                  control={control}
                  render={({ field: { value = 0, onChange } }) => {
                    const numericValue = Number(value) || 0;
                    const handleNumberChange = (delta) => {
                      const nextValue = Math.max(0, numericValue + delta);
                      onChange(nextValue);
                    };

                    return (
                      <div>
                        <label className="text-netral-900 mb-2 block text-sm">
                          Helm
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleNumberChange(-1)}
                            className="rounded border px-3 py-1"
                            disabled={isLoading}
                          >
                            -
                          </button>
                          <div className="px-3 font-semibold">
                            {numericValue}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNumberChange(1)}
                            className="rounded border px-3 py-1"
                            disabled={isLoading}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-netral-500 mt-2 text-xs">
                          *Helm 5000/pcs/hari
                        </p>
                      </div>
                    );
                  }}
                />

                <Controller
                  name="mantel"
                  control={control}
                  render={({ field: { value = 0, onChange } }) => {
                    const numericValue = Number(value) || 0;
                    const handleNumberChange = (delta) => {
                      const nextValue = Math.max(0, numericValue + delta);
                      onChange(nextValue);
                    };

                    return (
                      <div>
                        <label className="text-netral-900 mb-2 block text-sm">
                          Mantel
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleNumberChange(-1)}
                            className="rounded border px-3 py-1"
                            disabled={isLoading}
                          >
                            -
                          </button>
                          <div className="px-3 font-semibold">
                            {numericValue}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNumberChange(1)}
                            className="rounded border px-3 py-1"
                            disabled={isLoading}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-netral-500 mt-2 text-xs">
                          *Mantel 5000/pcs/hari
                        </p>
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          )}

          {isEditSession ? (
            <div className="border-netral-300 mt-6 border-t border-dashed pt-6">
              <h3 className="text-netral-900 mb-4 text-lg font-semibold">
                Dokumen Pelengkap
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "KTP Penyewa", url: dataEdit?.urlKtpPenyewa },
                  { label: "KTP Penjamin", url: dataEdit?.urlKtpPenjamin },
                  { label: "ID Karyawan", url: dataEdit?.urlIdKaryawan },
                  { label: "SIM A", url: dataEdit?.urlSimA },
                  { label: "Tiket Kereta", url: dataEdit?.urlTiketKereta },
                ].map((doc) => (
                  <DocumentPreview key={doc.label} {...doc} />
                ))}
              </div>
            </div>
          ) : (
            <div className="border-netral-200 mt-6 rounded-lg border bg-white p-6">
              <h3 className="text-netral-900 mb-4 text-lg font-semibold">
                Unggah dokumen
              </h3>
              <div className="space-y-4">
                {DOCUMENT_UPLOADS.map((doc) => {
                  const docState = documents[doc.key] || {};
                  const previewSrc =
                    docState.previewUrl || docState.uploadedUrl;
                  return (
                    <div key={doc.key}>
                      <label className="text-netral-900 mb-2 block text-sm font-medium">
                        {doc.label}
                      </label>
                      <div className="border-netral-300 hover:border-primary relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed p-6 text-center">
                        {previewSrc ? (
                          <>
                            <img
                              src={previewSrc}
                              alt={`${doc.label} preview`}
                              className="h-32 w-full rounded object-contain"
                            />
                            <p className="text-netral-600 mt-3 text-xs">
                              Klik untuk ganti dokumen
                            </p>
                          </>
                        ) : (
                          <>
                            <UploadIcon />
                            <p className="text-netral-600 text-xs">
                              Upload foto dokumen
                            </p>
                          </>
                        )}
                        <input
                          type="file"
                          accept={ACCEPTED_DOCUMENT_TYPES}
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={(event) => {
                            const selectedFile = event.target.files?.[0];
                            handleDocumentSelect(doc.key, selectedFile);
                            event.target.value = "";
                          }}
                          disabled={docState.uploading || isLoading}
                        />
                      </div>
                      {docState.uploading && (
                        <p className="text-primary mt-1 text-xs">
                          Mengunggah dokumen...
                        </p>
                      )}
                      {previewSrc && !docState.uploading && (
                        <p className="mt-1 text-xs text-green-600">
                          Dokumen siap diunggah saat simpan
                        </p>
                      )}
                      {docState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {docState.error}
                        </p>
                      )}
                      {doc.note && (
                        <p className="text-netral-500 mt-1 text-xs">
                          {doc.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border-netral-200 mt-6 rounded-xl border bg-white p-6">
            <h3 className="text-netral-900 text-lg font-semibold">
              Ringkasan Pemesanan
            </h3>
            <div className="text-netral-700 mt-4 space-y-1 text-sm">
              <p className="text-netral-900 font-semibold">
                {dataEdit?.namaKendaraan ||
                  kendaraanSelect?.namaKendaraan ||
                  "-"}
              </p>
              <p>{formatLongDate(tanggalMulaiDate)}</p>
              <p>{formatLongDate(tanggalAkhirDate)}</p>
              <p>{durationLabel}</p>
            </div>

            <div className="text-netral-800 mt-6 space-y-3 text-sm">
              <SummaryRow label="Sewa Kendaraan" value={sewaKendaraanCost} />
              {isMobil && includeDriver && (
                <SummaryRow label="Jasa Sopir" value={driverCost} />
              )}

              {isMotor && (
                <>
                  <SummaryRow
                    label={`Helm (x${numericHelm || 0})`}
                    value={helmCost}
                  />
                  <SummaryRow
                    label={`Mantel (x${numericMantel || 0})`}
                    value={mantelCost}
                  />
                </>
              )}
            </div>

            <div className="border-netral-200 mt-6 border-t pt-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total Harga</span>
                <span className="text-primary-600">{totalHargaFormatted}</span>
              </div>
            </div>
          </div>
        </Form.Body>
        {/* FOOTER FORM */}
        <Form.Footer>
          <Button
            disabled={isLoading}
            type="secondary"
            text="Batal"
            onClick={handleReset}
          />
          <Button
            text="Simpan"
            disabled={isLoading || isUploadingDocuments}
            typeButton="submit"
          />
        </Form.Footer>
      </Form>
    </FormProvider>
  );
}

export default PelangganForm;

function DocumentPreview({ label, url }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-netral-900 text-sm font-medium">{label}</span>
      <div className="border-netral-300 flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-3">
        {url ? (
          <>
            <img
              src={url}
              alt={`Dokumen ${label}`}
              className="max-h-64 w-full rounded-lg object-contain"
              loading="lazy"
            />
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm font-medium hover:underline"
            >
              Lihat ukuran penuh
            </a>
          </>
        ) : (
          <p className="text-netral-500 text-sm">Dokumen belum tersedia</p>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="text-netral-900 font-semibold">
        {value || value === 0 ? convertRupiah(value) : "-"}
      </span>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-2"
    >
      <path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
        stroke="#6D7280"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8L12 3L7 8"
        stroke="#6D7280"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V15"
        stroke="#6D7280"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function generateDocumentFileName(prefix, originalName) {
  const sanitized = originalName.replace(/[^a-zA-Z0-9.]/g, "-");
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${sanitized}`;
}
