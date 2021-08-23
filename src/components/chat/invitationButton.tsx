import copy from 'copy-to-clipboard';

import { Constant } from 'src/constant';

const logic = () => {
  if (process.env.NODE_ENV === 'production') {
    copy(window.location.href.replace(Constant.url.fact, Constant.url.proxy));
  } else {
    copy(window.location.href);
  }

  alert('招待URLをコピーしました\nSNS等に投稿して招待できます');
};

export const InvitationButton = (): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className="btn btn-info"
        style={{ width: 50, fontSize: 10 }}
        onClick={() => logic()}
      >
        招待
      </button>
    </>
  );
};
