import { db, getUid, firebase } from 'src/firebase';

const table = 'rooms';

export const create = async (name: string): Promise<string> => {
  const ret = await db.ref(table).push({
    hid: await getUid(),
    name: name,
    blacklist: { tmp: '' },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  });

  return ret.key as string;
};

export const update_blacklist = async (params: {
  rid: string;
  bid: string;
}): Promise<void> => {
  await db
    .ref(table)
    .child(params.rid)
    .update({
      blacklist: {
        [params.bid]: '',
      },
    });
};

export const remove = async (id: string): Promise<void> => {
  await db.ref(table).child(id).remove();
};

export const get = async (
  id: string
): Promise<{
  hid: string;
  name: string;
  blacklist?: { [key: string]: string };
}> => {
  const ret = await db.ref(table).child(id).once('value');

  const data: { hid: string; name: string } = ret.val();
  return data;
};
