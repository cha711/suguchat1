import { db, getUid, firebase } from 'src/firebase';
import { Boards } from 'src/types';
import { Constant } from 'src/constant';

const table = 'notifications';

export const create = async (params: {
  id: string;
  partner: string;
  message: string;
}): Promise<void> => {
  await db
    .ref(table)
    .child(params.id)
    .child(params.partner)
    .push({
      uid: await getUid(),
      message: params.message,
      name:
        localStorage.getItem(Constant.field.name) == null
          ? '名無し'
          : localStorage.getItem(Constant.field.name),
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
};

export const remove = async (params: {
  rid: string;
  bid: string;
}): Promise<void> => {
  await db.ref(table).child(params.rid).child(params.bid).remove();
};

export const get = async (params: {
  rid: string;
  partner: string;
}): Promise<Boards[]> => {
  const ret = await db
    .ref(table)
    .child(params.rid)
    .child(params.partner)
    .orderByChild(Constant.field.createdAt)
    .limitToLast(50)
    .once('value');

  if (ret.val() == null) {
    return [];
  }

  const val = ret.val();

  const data: Boards[] = Object.keys(val).map((key) => {
    return { id: key, ...val[key] };
  });

  return data;
};
