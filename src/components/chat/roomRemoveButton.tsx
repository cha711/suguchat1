import { remove } from 'src/firebase/rooms';
import { getRid } from 'src/util';

const logic = async () => {
  if (!confirm('部屋を削除しますか?')) {
    return;
  }

  await remove(getRid() as string);
  alert('部屋を削除しました');
  window.location.href = '/';
};

export const RoomRemoveButton = (): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        style={{ fontSize: 12 }}
        onClick={() => logic()}
      >
        部屋削除
      </button>
    </>
  );
};
