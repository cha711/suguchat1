import { useCustomRecoil } from 'src/recoil';
import { firebase } from 'src/firebase';
import { create } from 'src/firebase/boards';
import { getRid } from 'src/util';

const create_file_name = () => {
  const _s = 'abcdefghijklmnopqrstuvwxyz0123456789';

  return (
    [...Array(10)]
      .map(() => _s[Math.floor(Math.random() * _s.length)])
      .join('') + new Date().getTime()
  );
};

export const useUploadImage = (): {
  upload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
} => {
  const { loading } = useCustomRecoil();

  // 画像アップロード
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) {
      return;
    }

    loading.set(true);

    try {
      // 画像アップロード
      const _image = await firebase
        .storage()
        .ref()
        .child(create_file_name())
        .put(e.target.files[0]);

      // 画像のURL取得
      const url = await _image.ref.getDownloadURL();

      if (url == null) {
        throw new Error('');
      }

      const rid = getRid();
      if (rid == null) {
        return;
      }

      // データベースにURLを保存
      await create({
        id: rid,
        message: url,
        image: true,
      });

      loading.set(false);
    } catch (error) {
      alert('画像のサイズは5MBまでです。');
      window.location.reload();
    }
  };

  return { upload };
};
