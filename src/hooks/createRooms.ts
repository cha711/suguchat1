import validator from 'validator';
import { useRouter } from 'next/router';

import { useCustomRecoil } from 'src/recoil';

import { create as create_room } from 'src/firebase/rooms';
import { create as create_board } from 'src/firebase/boards';

export const useCreateRooms = (): {
  create: () => Promise<void>;
} => {
  const { loading } = useCustomRecoil();
  const router = useRouter();

  const create = async () => {
    const rname = window.prompt('部屋名を入力', '');

    if (rname == null) {
      return;
    }

    if (!validator.isLength(rname as string, { min: 1, max: 15 })) {
      alert('部屋名の長さは1～15文字以内');
      return;
    }

    loading.set(true);

    const id = await create_room(rname);
    await create_board({ id: id, message: '部屋を作成しました', image: false });

    router.push(`/chat?id=${id}`);
  };

  return { create };
};
