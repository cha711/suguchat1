import Message from 'src/components/chat/message';
import { RemoveButton } from 'src/components/chat/removeButton';

const RightMessage = (params: {
  id: string;
  uid: string;
  name: string;
  message: string;
  createdAt: string;
}): JSX.Element => {
  return (
    <>
      <div className="clearfix">
        <div className="float-end">
          <div style={{ fontSize: 12, color: '#fff' }}>
            {params.name == null ? '名無し' : params.name}
          </div>
          <div style={{ fontSize: 12, color: '#fff' }}>{params.uid}</div>
        </div>
      </div>

      <div className="clearfix">
        <div className="balloon-right float-end">
          <div style={{ whiteSpace: 'pre-wrap' }}>
            <Message message={params.message} />
          </div>
        </div>
      </div>

      <div className="clearfix">
        <div className="float-end">
          <time style={{ fontSize: 12 }}> {params.createdAt}</time>
        </div>
      </div>

      <div className="clearfix">
        <div className="float-end">
          <RemoveButton id={params.id} />
        </div>
      </div>

      <br />

      <style jsx>{`
        /* 吹き出し右 */
        .balloon-right {
          position: relative;
          padding: 10px;
          border-radius: 10px;
          background-color: #30e852;
          max-width: 250px;
          font-size: 15px;
          word-wrap: break-word;
          margin-right: 20px;
        }

        /* 三角アイコン右 */
        .balloon-right::before {
          content: '';
          position: absolute;
          top: 3px;
          right: -19px;
          border: 8px solid transparent;
          border-left: 18px solid #30e852;
          -webkit-transform: rotate(-35deg);
          transform: rotate(-35deg);
        }
      `}</style>
    </>
  );
};

export default RightMessage;
