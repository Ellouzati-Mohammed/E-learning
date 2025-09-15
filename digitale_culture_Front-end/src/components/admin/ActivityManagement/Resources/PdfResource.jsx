import { NormalInput } from "../../../ValidationInputs";

const PdfResource = ({ data, errors, onChange }) => {
  return (
    <>
      <NormalInput
        label="Pdf Title"
        placeholder="Ex : JavaScript cookies"
        name="pdf_title"
        value={data.pdf_title}
        setValue={onChange}
        error={errors?.pdf_title}
      />
      <NormalInput
        label="Url Pdf"
        placeholder="Ex : "
        name="pdf_url"
        value={data.pdf_url}
        setValue={onChange}
        error={errors?.pdf_url}
      />
    </>
  );
};

export default PdfResource;