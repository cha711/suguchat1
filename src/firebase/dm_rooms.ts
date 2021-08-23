import { db, getUid, firebase } from 'src/firebase';

const table = 'dm_rooms';

export const create = async (params: {
  id: string;
  member: string;
}): Promise<void> => {
  await db
    .ref(table)
    .child(params.id)
    .set({
      member1: await getUid(),
      member2: params.member,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
};
