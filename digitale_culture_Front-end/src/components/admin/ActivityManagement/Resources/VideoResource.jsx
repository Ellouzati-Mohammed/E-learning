import { NormalInput } from "../../../ValidationInputs";

const VideoResource = ({ data, errors, onChange }) => {
  return (
    <NormalInput
      label="Url video"
      placeholder="Ex : Machine Learning"
      name="video_url"
      value={data.video_url}
      setValue={onChange}
      error={errors?.video_url}
    />
  );
};

export default VideoResource;