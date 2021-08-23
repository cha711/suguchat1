import React from 'react';
import { useRouter } from 'next/router';

import { getUid, firebase, create_dm_id } from 'src/firebase';
import { get as get_dm_boards } from 'src/firebase/dm_boards';

import { useCustomRecoil } from 'src/recoil';
import { Boards } from 'src/types';
import { Constant } from 'src/constant';
import { getRid, getPartner } from 'src/util';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const orderBy = require('lodash.orderby');

const getData = async (partner: string) => {
  const data: Boards[] = orderBy(
    await get_dm_boards(await create_dm_id(partner)),
    Constant.field.createdAt,
    Constant.sort.asc
  );

  return data;
};

const request = async (partner: string) => {
  // api処理
  const res = await fetch(Constant.api + '/set_dm_rooms', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(
        await firebase.auth().currentUser?.getIdToken(true)
      ),
    },
    body: JSON.stringify({
      partner: partner,
    }),
  });

  if (res.status !== 200) {
    return false;
  }

  return true;
};

export const useDm = (): void => {
  const { loading, uid, boards, rname } = useCustomRecoil();
  const router = useRouter();

  const method = (data: Boards[]) => {
    const doc_id = '#_chat';

    const pos =
      Number(document.querySelector(doc_id)?.getBoundingClientRect().top) +
      Number(document.querySelector(doc_id)?.scrollHeight);

    boards.set(data);
    loading.set(false);

    if (isNaN(pos)) {
      setTimeout(() => {
        document.querySelector(doc_id)?.scrollIntoView({ block: 'end' });
      }, 250);

      return;
    }

    if (pos <= 700) {
      document.querySelector(doc_id)?.scrollIntoView({ block: 'end' });
    }
  };

  React.useEffect(() => {
    (async () => {
      const rid = getRid();
      const _uid = await getUid();
      const partner = getPartner();

      if (rid == null || partner == null) {
        alert('不正な処理がされました');
        router.push('/');
        return;
      }

      const id = await create_dm_id(partner);

      const dm_boards = firebase
        .database()
        .ref(Constant.table.dm_boards)
        .child(id)
        .orderByChild(Constant.field.createdAt)
        .limitToLast(50);

      try {
        await request(partner);

        dm_boards.on('value', async () => await method(await getData(partner)));

        uid.set(_uid);
        rname.set(partner);
      } catch (error) {
        alert('不正な処理がされました');
        router.push('/');
      }

      return () => {
        dm_boards.off('value');
      };
    })();
  }, []);
};
