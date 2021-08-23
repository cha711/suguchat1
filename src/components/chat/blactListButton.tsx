import { update_blacklist } from 'src/firebase/rooms';
import { create } from 'src/firebase/boards';
import { getRid } from 'src/util';

const logic = async (uid: string) => {
  if (!confirm('追放しますか?')) {
    return;
  }

  await update_blacklist({
    rid: getRid() as string,
    bid: uid,
  });

  await create({
    id: getRid() as string,
    message: `id ${uid}を追放しました`,
    image: false,
  });

  alert(`id ${uid}を追放しました`);
  location.reload();
};

export const BlackListButton = (params: { uid: string }): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ width: 35, fontSize: 12, padding: 0, marginTop: 10 }}
        onClick={() => logic(params.uid)}
      >
        追放
      </button>
    </>
  );
};
