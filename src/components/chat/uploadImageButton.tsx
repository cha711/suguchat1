import { useUploadImage } from 'src/hooks/uploadImage';

export const UploadImageButton = (): JSX.Element => {
  const { upload } = useUploadImage();

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
