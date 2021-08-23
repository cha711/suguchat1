const logic = async (params: { uid: string }) => {
  if (!confirm('ブロックしますか?')) {
    return;
  }

  const block = JSON.parse(localStorage.getItem('block') as string);
  if (block == null) {
    localStorage.setItem('block', JSON.stringify({ [params.uid]: '' }));
  } else {
    block[params.uid] = '';
    localStorage.setItem('block', JSON.stringify(block));
  }

  alert('ブロックしました');
  window.location.reload();
};

export const BloackButton = (params: { uid: string }): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        style={{
          width: 50,
          fontSize: 12,
          padding: 0,
          marginLeft: 15,
          marginTop: 10,
        }}
        onClick={() => logic(params)}
      >
        ブロック
      </button>
    </>
  );
};
