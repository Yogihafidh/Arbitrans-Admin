import { FormProvider, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import SelectInput from "../../ui/SelectInput";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useEditStatus } from "../pelanggan/useEditStatus";

function StatusKendaraanForm({ dataEdit, onCloseModal }) {
  const { isEdit, editStatusKendaraan } = useEditStatus();
  const methods = useForm({
    defaultValues: {
      nama_kendaraan: dataEdit.namaKendaraan,
      nama_pelanggan: dataEdit.namaPelanggan,
      status_kendaraan: dataEdit.statusKendaraan,
    },
  });
  const { register, handleSubmit, reset } = methods;

  function onSubmit(data) {
    editStatusKendaraan(
      {
        idKendaraan: dataEdit.idKendaraan,
        ...data,
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
      <Form onSubmit={handleSubmit(onSubmit)} className="h-fit">
        <Form.Header
          formName={"Status Kendaraan"}
          onClose={() => onCloseModal?.()}
        />
        <Form.Body>
          <div className="border-netral-400 mb-4 rounded-xl border p-4">
            <Form.Row label="Name Kendaraan" name="nama_kendaraan">
              <Input
                inputClass="w-full text-netral-600"
                placeholder="Nama Kendaraaan"
                disabled={true}
                defaultValues={""}
                {...register("nama_kendaraan")}
              />
            </Form.Row>
            <Form.Row label="Pelanggan" name="nama_pelanggan">
              <Input
                inputClass="w-full text-netral-600"
                placeholder="Nama Pelanggan"
                disabled={true}
                defaultValues={""}
                {...register("nama_pelanggan")}
              />
            </Form.Row>
          </div>

          <Form.Row label="Status" name="status">
            <SelectInput
              disabled={isEdit}
              placeholder="Pilih nama kendaraan terlebih dahulu"
              options={[
                { value: "Tersedia", label: "Tersedia" },
                { value: "Pending", label: "Pending" },
                { value: "Disewa", label: "Disewa" },
              ]}
              {...register("status_kendaraan", {
                required: "Status Kendaraan wajib dipilih",
              })}
              disabledPlaceholder={true}
            />
          </Form.Row>
        </Form.Body>
        <Form.Footer>
          <Button
            // disabled={isLoading}
            type="secondary"
            text="Batal"
            onClick={() => {
              reset();
              onCloseModal?.();
            }}
          />
          <Button text="Simpan" typeButton="submit" />
        </Form.Footer>
      </Form>
    </FormProvider>
  );
}

export default StatusKendaraanForm;
