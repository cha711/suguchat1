import { useUploadDmImage } from 'src/hooks/uploadDmImage';

export const UploadImageButton = (): JSX.Element => {
  const { upload } = useUploadDmImage();

  return (
    <label>
      <span className="btn btn-success" style={{ fontSize: 12 }}>
        画像アップロード
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => upload(e)}
        />
      </span>
    </label>
  );
};
