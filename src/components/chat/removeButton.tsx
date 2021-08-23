import { getRid } from 'src/util';
import { remove } from 'src/firebase/boards';
import { Constant } from 'src/constant';
import { db, firebase } from 'src/firebase';

const logic = async (params: { id: string }) => {
  if (!confirm('メッセージを削除しますか?')) {
    return;
  }

  const rid = getRid();

  const ret = await db
    .ref(Constant.table.boards)
    .child(rid as string)
    .child(params.id)
    .once('value');

  const val: { image: boolean; message: string } = ret.val();

  if (val.image) {
    // 画像削除
    await firebase
      .storage()
      .ref()
      .child(val.message.split('/')[7].split('?')[0])
      .delete();
  }

  await remove({ rid: rid as string, bid: params.id });
};

export const RemoveButton = (params: { id: string }): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        style={{ width: 20, fontSize: 12, padding: 0 }}
        onClick={() => logic(params)}
      >
        削
      </button>
    </>
  );
};
