import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import FileInput from "../../ui/FileInput";
import TextArea from "../../ui/Textarea";
import SelectInput from "../../ui/SelectInput";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { useCreateKendaraan } from "./useCreateKendaraan";

function CreateKendaraanForm({ onCloseModal }) {
  const { isCreating, createKendaraan } = useCreateKendaraan();
  const methods = useForm();
  const { register, handleSubmit, reset, control } = methods;

  function onSubmit(data) {
    console.log("Data terkirim:", data);

    createKendaraan(
      {
        ...data,
        harga_sewa: Number(data.harga_sewa),
        gambar: !data.gambar ? [] : data.gambar,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* HEADER FORM */}
        <Form.Header
          formName="Detail Kendaraan"
          onClose={() => onCloseModal?.()}
        />

        {/* BODY FORM */}
        <section className="px-8 py-8">
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
            <Form.Row label="Name Kendaraan" name="nama_kendaraan" type="text">
              <Input
                isInputForm={true}
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
                isInputForm={true}
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
                  isInputForm={true}
                  placeholder="Masukan harga sewa"
                  inputClass="w-full"
                  isCurrency={true}
                  minNumber={1000}
                  maxNumber={2000000}
                />
              )}
            />
          </Form.Row>

          <Row>
            <Form.Row label="Tipe" name="tipe_kendaraan">
              <Input
                isInputForm={true}
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
                isInputForm={true}
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
                isInputForm={true}
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
                isInputForm={true}
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
                isInputForm={true}
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
                type="number"
                isInputForm={true}
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
              isInputForm={true}
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
        </section>

        {/* FOOTER FORM */}
        <Form.Footer>
          <Button
            disabled={isCreating}
            type="secondary"
            text="Riset"
            onClick={() => reset()}
          />
          <Button text="Masuk" disabled={isCreating} typeButton="submit" />
        </Form.Footer>
      </Form>
    </FormProvider>
  );
}

export default CreateKendaraanForm;
