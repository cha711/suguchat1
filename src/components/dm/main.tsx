import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { useCustomRecoil } from 'src/recoil';

import Article from 'src/components/dm/article';

const Main = (): JSX.Element => {
  const { rname } = useCustomRecoil();

  return (
    <>
      <main>
        <p style={{ margin: 0, color: 'tomato' }}>DM</p>
        <p>{rname.state}</p>
        <SimpleBar
          style={{ height: '100%', overflow: 'auto' }}
          autoHide={false}
        >
          <Article />
        </SimpleBar>
      </main>
    </>
  );
};

export default Main;
