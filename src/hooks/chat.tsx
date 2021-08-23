import React from 'react';
import { useRouter } from 'next/router';

import { getUid, firebase } from 'src/firebase';
import { get as get_room } from 'src/firebase/rooms';
import { get as get_board } from 'src/firebase/boards';
import { get as get_notifications } from 'src/firebase/notifications';

import { useCustomRecoil } from 'src/recoil';
import { Boards } from 'src/types';
import { Constant } from 'src/constant';
import { getRid } from 'src/util';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const orderBy = require('lodash.orderby');

const getData = async (id: string) => {
  const data: Boards[] = orderBy(
    [
      ...(await get_notifications({
        rid: id as string,
        partner: await getUid(),
      })),
      ...(await get_board(id as string)),
    ],

    Constant.field.createdAt,
    Constant.sort.asc
  );

  return data;
};

export const useChat = (): void => {
  const { loading, uid, boards, host, rname, blacklist } = useCustomRecoil();
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

      if (rid == null) {
        alert('部屋が存在しません');
        router.push('/');
        return;
      }

      const rooms = firebase
        .database()
        .ref(Constant.table.rooms)
        .child(rid as string);

      const boards = firebase
        .database()
        .ref(Constant.table.boards)
        .child(rid)
        .orderByChild(Constant.field.createdAt)
        .limitToLast(50);

      const notifications = firebase
        .database()
        .ref(Constant.table.notifications)
        .child(rid)
        .child(_uid)
        .orderByChild(Constant.field.createdAt)
        .limitToLast(50);

      try {
        const room = await get_room(rid);
        rname.set(room.name);
        host.set(_uid == room.hid);
        room.blacklist != null && blacklist.set(Object.keys(room.blacklist));

        rooms.on('value', async (snapshot) => {
          if (!snapshot.exists()) {
            alert('部屋が存在しません');
            router.push('/');
          }
        });

        boards.on('value', async () => await method(await getData(rid)));

        notifications.on('value', async () => await method(await getData(rid)));

        uid.set(_uid);
      } catch (error) {
        alert('部屋が存在しません');
        router.push('/');
      }

      return () => {
        rooms.off('value');
        boards.off('value');
        notifications.off('value');
      };
    })();
  }, []);
};
