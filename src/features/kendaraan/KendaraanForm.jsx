import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import FileInput from "../../ui/FileInput";
import TextArea from "../../ui/Textarea";
import SelectInput from "../../ui/SelectInput";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { useCreateKendaraan } from "./useCreateKendaraan";
import { useEditKendaraan } from "./useEditKendaraan";

function KendaraanForm({ dataEdit = {}, onCloseModal }) {
  const { isCreating, createKendaraan } = useCreateKendaraan();
  const { isEdit, editKendaraan } = useEditKendaraan();
  const isLoading = isCreating || isEdit;

  const isEditSession = Boolean(dataEdit.id);

  const methods = useForm({
    defaultValues: isEditSession
      ? {
          gambar: dataEdit.imageKendaraan,
          nama_kendaraan: dataEdit.namaKendaraan,
          jenis_kendaraan: dataEdit.jenisKendaraan,
          harga_sewa: dataEdit.hargaSewa,
          tipe_kendaraan: dataEdit.tipeKendaraan,
          transmisi: dataEdit.transmisi,
          kapasitas_penumpang: dataEdit.kapasitas,
          bahan_bakar: dataEdit.bahanBakar,
          luas_bagasi: dataEdit.luasBagasi,
          tahun_produksi: dataEdit.tahunProduksi,
          deskripsi_kendaraan: dataEdit.deskripsi,
        }
      : {},
  });

  const { register, handleSubmit, reset, control } = methods;

  function onSubmit(data) {
    if (isEditSession)
      editKendaraan(
        { ...data, id: dataEdit.id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createKendaraan(
        {
          ...data,
          harga_sewa: Number(data.harga_sewa),
          gambar: !data.gambar ? [] : data.gambar,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        },
      );
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* HEADER FORM */}
        <Form.Header
          formName={isEditSession ? "Detail Kendaraan" : "Tambah Kendaraan"}
          onClose={() => onCloseModal?.()}
        />

        {/* BODY FORM */}
        <Form.Body>
          <div className="border-netral-400 mb-4 border-b border-dashed pb-1">
            <Form.Row label="Gambar" name="gambar">
              <Controller
                name="gambar"
                control={control}
                render={({ field }) => (
                  <FileInput
                    label="Pilih Gambar"
                    accept="image/*"
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                  />
                )}
              />
            </Form.Row>
          </div>

          <p className="text-netral-900 mb-4 font-semibold">Informasi Umum</p>
          <Row>
            <Form.Row label="Name Kendaraan" name="nama_kendaraan">
              <Input
                placeholder="Masukan nama kendaraan"
                {...register("nama_kendaraan", {
                  required: "Nama kendaraan wajib diisi!",
                  minLength: {
                    value: 5,
                    message: "Nama minimal 5 karakter",
                  },
                  maxLength: {
                    value: 150,
                    message: "Nama maksimal 150 karakter",
                  },
                })}
              />
            </Form.Row>
            <Form.Row label="Jenis" name="jenis_kendaraan">
              <SelectInput
                placeholder="Pilih jenis kendaraan"
                options={[
                  { value: "mobil", label: "Mobil" },
                  { value: "motor", label: "Motor" },
                ]}
                {...register("jenis_kendaraan", {
                  required: "Jenis kendaraan wajib diisi",
                })}
              />
            </Form.Row>
          </Row>

          <Form.Row label="Harga Sewa Perhari" name="harga_sewa">
            <Controller
              name="harga_sewa"
              control={control}
              defaultValue=""
              rules={{
                required: "Harga sewa wajib diisi",
                min: {
                  value: 1000,
                  message: "Harga sewa tidak boleh kurang dari Rp1.000",
                },
                max: {
                  value: 2000000,
                  message: "Harga sewa tidak boleh lebih dari Rp2.000.000",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  inputType="currency"
                  placeholder="Masukan harga sewa"
                  inputClass="w-full"
                  minNumber={1000}
                  maxNumber={2000000}
                />
              )}
            />
          </Form.Row>

          <Row>
            <Form.Row label="Tipe" name="tipe_kendaraan">
              <Input
                placeholder="Tipe kendaraan"
                {...register("tipe_kendaraan", {
                  required: "Tipe kendaraan wajib diisi",
                  minLength: {
                    value: 5,
                    message: "Nama minimal 5 karakter",
                  },
                  maxLength: {
                    value: 100,
                    message: "Nama maksimal 100 karakter",
                  },
                })}
              />
            </Form.Row>
            <Form.Row label="Transmisi" name="transmisi">
              <SelectInput
                placeholder="Transmisi kendaraan"
                options={[
                  { value: "matic", label: "Matic" },
                  { value: "manual", label: "Manual" },
                ]}
                {...register("transmisi", {
                  required: "Transmisi kendaraan wajib diisi",
                })}
              />
            </Form.Row>
          </Row>

          <Row>
            <Form.Row label="Kapasitas Penumpang" name="kapasitas_penumpang">
              <Input
                type="number"
                inputClass="w-full"
                placeholder="Jumalah maks. penumpang"
                minNumber={1}
                maxNumber={8}
                {...register("kapasitas_penumpang", {
                  required: "Kapasitas penumpang wajib diisi",
                  min: {
                    value: 1,
                    message: "Kapasitas penumpang tidak boleh kurang dari 1",
                  },
                  max: {
                    value: 8,
                    message: "Kapasitas penumpang tidak boleh lebih dari 8",
                  },
                })}
              />
            </Form.Row>
            <Form.Row label="Bahan Bakar" name="bahan_bakar">
              <Input
                placeholder="Masukan bahan bakar"
                {...register("bahan_bakar", {
                  required: "Bahan bakar kendaraan wajib diisi",
                  minLength: {
                    value: 5,
                    message: "Nama minimal 5 karakter",
                  },
                  maxLength: {
                    value: 100,
                    message: "Nama maksimal 100 karakter",
                  },
                })}
              />
            </Form.Row>
          </Row>

          <Row>
            <Form.Row label="Bagasi" name="luas_bagasi">
              <Input
                placeholder="Luas bagasi"
                {...register("luas_bagasi", {
                  required: "Luas bagasi kendaraan wajib diisi",
                  minLength: {
                    value: 5,
                    message: "Nama minimal 5 karakter",
                  },
                  maxLength: {
                    value: 200,
                    message: "Nama maksimal 200 karakter",
                  },
                })}
              />
            </Form.Row>
            <Form.Row label="Tahun" name="tahun_produksi">
              <Input
                inputClass="w-full"
                type="number"
                placeholder="Tahun produksi"
                {...register("tahun_produksi", {
                  required: "Tahun produksi kendaraan wajib diisi",
                  min: {
                    value: 1900,
                    message: "Tahun produksi tidak boleh kurang dari 1900",
                  },
                  max: {
                    value: new Date().getFullYear(),
                    message: `Tahun produksi tidak boleh kurang dari ${new Date().getFullYear()}`,
                  },
                })}
              />
            </Form.Row>
          </Row>

          <Form.Row label="Deskripsi Kendaraan" name="deskripsi_kendaraan">
            <TextArea
              placeholder="Jelaskan kondisi kendaraan"
              rows={6}
              {...register("deskripsi_kendaraan", {
                required: "Deskripsi kendaraan wajib diisi",
                minLength: {
                  value: 10,
                  message: "Nama minimal 10 karakter",
                },
                maxLength: {
                  value: 5000,
                  message: "Nama maksimal 5000 karakter",
                },
              })}
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

export default KendaraanForm;
