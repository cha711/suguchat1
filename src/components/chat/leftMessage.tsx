import React from 'react';

import Message from 'src/components/chat/message';
import { RemoveButton } from 'src/components/chat/removeButton';
import { DmButton } from 'src/components/chat/dmButton';
import { BlackListButton } from 'src/components/chat/blactListButton';
import { BloackButton } from 'src/components/chat/blockButton';

import { useCustomRecoil } from 'src/recoil';

import { getRid } from 'src/util';

const LeftMessage = (params: {
  id: string;
  uid: string;
  name: string;
  message: string;
  image?: boolean;
  createdAt: string;
}): JSX.Element => {
  const { host, blacklist } = useCustomRecoil();

  return (
    <>
      <div style={{ fontSize: 12, color: '#fff' }}>
        {params.name == null ? '名無し' : params.name}
      </div>
      <div style={{ fontSize: 12, color: '#fff' }}>{params.uid}</div>

      <div className="clearfix">
        <div className="balloon-left float-start">
          <div style={{ whiteSpace: 'pre-wrap' }}>
            <Message message={params.message} />
          </div>
        </div>
      </div>

      <div className="clearfix">
        <time style={{ fontSize: 12 }}> {params.createdAt} </time>
      </div>

      {host.state === true && (
        <>
          <div className="clearfix">
            {params.image != null && <RemoveButton id={params.id} />}
          </div>

          {blacklist.state.indexOf(params.uid) === -1 && (
            <div className="clearfix">
              <BlackListButton uid={params.uid} />
            </div>
          )}
        </>
      )}

      {blacklist.state.indexOf(params.uid) === -1 && (
        <div className="clearfix">
          <a href={`/dm?id=${getRid()}&partner=${params.uid}`}>
            <DmButton />
          </a>

          <BloackButton uid={params.uid} />
        </div>
      )}

      <br />

      <style jsx>{`
        /* 吹き出し左 */
        .balloon-left {
          position: relative;
          padding: 10px;
          border-radius: 10px;
          background-color: #000;
          color: #fff;
          max-width: 250px;
          font-size: 15px;
          word-wrap: break-word;
          margin-left: 10px;
        }

        /* 三角アイコン左 */
        .balloon-left::before {
          content: '';
          display: inline-block;
          position: absolute;
          top: 3px;
          left: -19px;
          border: 8px solid transparent;
          border-right: 18px solid #000;
          -webkit-transform: rotate(35deg);
          transform: rotate(35deg);
        }
      `}</style>
    </>
  );
};

export default LeftMessage;
