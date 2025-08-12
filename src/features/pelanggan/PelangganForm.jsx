import { addDays, differenceInCalendarDays, subDays } from "date-fns";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useKendaraan } from "../../hooks/useKendaraan";
import { useCreateRental } from "./useCreatePelanggan";
import { useRental } from "../../hooks/useRental";
import { useEditRental } from "./useEditRental";
import { convertRupiah } from "../../utils/helper";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import Row from "../../ui/Row";
import DateInput from "../../ui/DateInput";
import TextArea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Loading from "../../ui/Loading";

function PelangganForm({ dataEdit = {}, onCloseModal }) {
  // Check if edit session
  const isEditSession = Boolean(dataEdit.id);
  const methods = useForm({
    defaultValues: isEditSession
      ? {
          nama_pelanggan: dataEdit.namaPelanggan,
          nik: dataEdit.nik,
          no_telephone: dataEdit.noTelephone,
          alamat: dataEdit.alamat,
          id_kendaraan: dataEdit.idKendaraan,
          tanggal_mulai: dataEdit.tanggalMulai,
          tanggal_akhir: dataEdit.tanggalAkhir,
        }
      : {},
  });
  const { register, handleSubmit, reset, control } = methods;

  const { isCreating, createRental } = useCreateRental();
  const { isEdit, editRental } = useEditRental();
  const { kendaraan = [], isLoading: kendaraanLoading } = useKendaraan();
  const { rental = [], isLoading: rentalLoading } = useRental([
    "Disewa",
    "Pending",
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

  const price =
    convertRupiah(
      differenceInCalendarDays(tanggalAkhir, tanggalAwal) *
        Number(kendaraanSelect?.hargaSewa),
    ) || "Silahkan pilih Kendaraan dan Tanggal terlebih dahulu";

  function onSubmit(data) {
    if (isEditSession)
      editRental(
        { id: dataEdit.id, ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createRental(
        { status: "Pending", ...data },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        },
      );
  }

  if (isEditSession && kendaraan.length === 0) return <Loading />;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Header
          formName={isEditSession ? "Edit Pelanggan" : "Tambah Pelanggan"}
          onClose={() => onCloseModal?.()}
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

          <Form.Row label="Harga Sewa" name="harga_sewa">
            <Input
              inputClass="w-full text-netral-600"
              placeholder="Pilih nama kendaraan dan tanggal terlebih dahulu"
              disabled={true}
              value={price}
            />
          </Form.Row>
        </Form.Body>
        {/* FOOTER FORM */}
        <Form.Footer>
          <Button
            disabled={isLoading}
            type="secondary"
            text="Batal"
            onClick={() => reset()}
          />
          <Button text="Simpan" disabled={isLoading} typeButton="submit" />
        </Form.Footer>
      </Form>
    </FormProvider>
  );
}

export default PelangganForm;
