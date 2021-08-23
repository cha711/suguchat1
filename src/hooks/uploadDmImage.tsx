import { useCustomRecoil } from 'src/recoil';
import { firebase, create_dm_id } from 'src/firebase';
import { create as create_dm_boards } from 'src/firebase/dm_boards';
import { create as create_notifications } from 'src/firebase/notifications';
import { getPartner, getRid } from 'src/util';
import { getUid } from 'src/firebase';

import { Constant } from 'src/constant';

const create_file_name = () => {
  const _s = 'abcdefghijklmnopqrstuvwxyz0123456789';

  return (
    [...Array(10)]
      .map(() => _s[Math.floor(Math.random() * _s.length)])
      .join('') + new Date().getTime()
  );
};

export const useUploadDmImage = (): {
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
      await create_dm_boards({
        id: await create_dm_id(getPartner() as string),
        message: url,
        image: true,
      });

      loading.set(false);

      const message =
        process.env.NODE_ENV === 'production'
          ? `DM送りました\n${
              Constant.url.proxy
            }/dm?id=${rid}&partner=${await getUid()}`
          : `DM送りました\n${location.protocol}//${
              location.host
            }/dm?id=${rid}&partner=${await getUid()}`;

      await create_notifications({
        id: getRid() as string,
        partner: getPartner() as string,
        message: message,
      });
    } catch (error) {
      alert('画像のサイズは5MBまでです。');
      window.location.reload();
    }
  };

  return { upload };
};
