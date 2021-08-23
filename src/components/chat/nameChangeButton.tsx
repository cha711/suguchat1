import validator from 'validator';

const logic = () => {
  const name = prompt('なまえを入力してください', '');
  if (name == null) {
    return;
  }

  if (!validator.isLength(name as string, { min: 1, max: 15 })) {
    alert('なまえの長さは1～15文字以内');
    return;
  }

  alert(`なまえを「${name}」に変更しました`);
  localStorage.setItem('name', name);
};

export const NameChangeButton = (): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        style={{ fontSize: 12, marginLeft: 5 }}
        onClick={() => logic()}
      >
        なまえ変更
      </button>
    </>
  );
};
