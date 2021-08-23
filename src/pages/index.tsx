import React from 'react';

import { useCustomRecoil } from 'src/recoil';

import { useCreateRooms } from 'src/hooks/createRooms';

import { getUid } from 'src/firebase';

import App from 'src/layouts/v1';

const Root = (): JSX.Element => {
  const { create } = useCreateRooms();
  const { loading } = useCustomRecoil();

  return (
    <App
      useEffect={() => {
        (async () => {
          await getUid();
          loading.set(false);
        })();
      }}
      component={
        <div className="position-absolute h-100 w-100 m-0 d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={async () => create()}
          >
            部屋をつくる
          </button>
        </div>
      }
    />
  );
};

export default Root;
