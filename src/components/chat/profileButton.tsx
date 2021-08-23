import { getUid } from 'src/firebase';

const logic = async () => {
  alert(
    `id: ${await getUid()}\nなまえ:${
      localStorage.getItem('name') == null
        ? '名無し'
        : localStorage.getItem('name')
    }`
  );
};

export const ProfileButton = (): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="btn btn-info"
        style={{ fontSize: 12, marginLeft: 5 }}
        onClick={() => logic()}
      >
        プロフィール
      </button>
    </>
  );
};
