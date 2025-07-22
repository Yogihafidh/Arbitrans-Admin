import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import FileInput from "../../ui/FileInput";
import TextArea from "../../ui/Textarea";
import SelectInput from "../../ui/SelectInput";

function CreateKendaraanForm() {
  return (
    <Form>
      <Form.Header formName="Detail Kendaraan" />
      <section className="px-8 py-8">
        <div className="border-netral-400 mb-4 border-b border-dashed pb-1">
          <Form.Row label="Gambar">
            <FileInput label="Pilih Gambar" accept="image/*" />
          </Form.Row>
        </div>

        <p className="text-netral-900 mb-4 font-semibold">Informasi Umum</p>
        <Row>
          <Form.Row label="Name Kendaraan">
            <Input inputType="inputForm" placeholder="Masukan nama kendaraan" />
          </Form.Row>
          <Form.Row label="Jenis">
            <SelectInput
              inputType="inputForm"
              placeholder="Pilih jenis kendaraan"
              options={[
                { value: "mobil", label: "Mobil" },
                { value: "motor", label: "Motor" },
              ]}
            />
          </Form.Row>
        </Row>

        <Form.Row label="Harga Sewa Perhari">
          <Input inputType="inputForm" placeholder="Masukan harga sewa" />
        </Form.Row>

        <Row>
          <Form.Row label="Tipe">
            <Input inputType="inputForm" placeholder="Tipe kendaraan" />
          </Form.Row>
          <Form.Row label="Transmisi">
            <SelectInput
              inputType="inputForm"
              placeholder="Transmisi kendaraan"
              options={[
                { value: "matic", label: "Matic" },
                { value: "manual", label: "Manual" },
              ]}
            />
          </Form.Row>
        </Row>

        <Row>
          <Form.Row label="Kapasitas Penumpang">
            <Input
              inputType="inputForm"
              placeholder="Jumalah maks. penumpang"
            />
          </Form.Row>
          <Form.Row label="Bahan Bakar">
            <Input inputType="inputForm" placeholder="Masukan bahan bakar" />
          </Form.Row>
        </Row>

        <Row>
          <Form.Row label="Bagasi">
            <Input inputType="inputForm" placeholder="Luas bagasi" />
          </Form.Row>
          <Form.Row label="Tahun">
            <Input inputType="inputForm" placeholder="Tahun produksi" />
          </Form.Row>
        </Row>

        <Form.Row label="Deskripsi Kendaraan">
          <TextArea
            inputType="inputForm"
            placeholder="Jelaskan kondisi kendaraan"
            rows={6}
          />
        </Form.Row>
      </section>

      <Form.Footer>
        <Button type="secondary" text="Riset" />
        <Button text="Masuk" />
      </Form.Footer>
    </Form>
  );
}

export default CreateKendaraanForm;
