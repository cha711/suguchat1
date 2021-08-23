import React from 'react';

import Message from 'src/components/chat/message';
import { RemoveButton } from 'src/components/chat/removeButton';

import { useCustomRecoil } from 'src/recoil';

const LeftMessage = (params: {
  id: string;
  uid: string;
  name: string;
  message: string;
  createdAt: string;
}): JSX.Element => {
  const { host } = useCustomRecoil();

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
            <RemoveButton id={params.id} />
          </div>
        </>
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
