import React from 'react';
import Head from 'next/head';

import Header from 'src/components/dm/header';
import Footer from 'src/components/dm/footer';
import Main from 'src/components/dm/main';
import Aside from 'src/components/chat/aside';

import { useDm } from 'src/hooks/dm';

import { Constant } from 'src/constant';

import App from 'src/layouts/v1';

const Chat = (): JSX.Element => {
  useDm();

  return (
    <App
      useEffect={() => {
        (async () => {})();
      }}
      component={
        <>
          <Head>
            <title>{`DM ${Constant.title}`}</title>
          </Head>

          <div style={{ background: '#f7f7f7', margin: 0 }}>
            <div className="container">
              <div className="row">
                <div className="col-sm-9 px-0">
                  <Header />
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-sm-9 px-0">
                  <Main />
                </div>

                <div className="col-sm-3">
                  <Aside />
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-sm-9" style={{ padding: 0 }}>
                  <Footer />
                </div>
              </div>
            </div>

            <style jsx global>{`
              header {
                height: 7vh;
              }

              main {
                overflow-y: scroll;
                overflow-wrap: break-word;
                height: 63vh;
              }

              main::-webkit-scrollbar {
                display: none;
              }

              aside {
                height: 70vh;
              }

              /* スマホ用 */
              @media screen and (max-width: 768px) {
                aside {
                  display: none;
                }
              }

              footer {
                height: 28vh;
              }
            `}</style>
          </div>
        </>
      }
    />
  );
};

export default Chat;
