import React from 'react';
import Head from 'next/head';
import { useCustomRecoil } from 'src/recoil';

import { Constant } from 'src/constant';

import { Loading } from 'src/layouts/v1/loading';

const App = (params: {
  useEffect: () => void;
  component: JSX.Element;
}): JSX.Element => {
  const [init, setInit] = React.useState(false);
  const { loading } = useCustomRecoil();

  React.useEffect(() => {
    setInit(true);
    params.useEffect();

    return () => {
      loading.set(true);
    };
  }, []);

  if (loading.state) {
    return <Loading />;
  }

  if (!init) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{Constant.title}</title>
      </Head>
      {params.component}
    </>
  );
};

export default App;
