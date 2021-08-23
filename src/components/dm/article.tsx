import moment from 'moment';

import { useCustomRecoil } from 'src/recoil';

import LeftMessage from 'src/components/dm/leftMessage';
import RightMessage from 'src/components/dm/rightMessage';

const Article = (): JSX.Element => {
  const { loading, boards, uid } = useCustomRecoil();

  const block: { [key: string]: string } = JSON.parse(
    localStorage.getItem('block') as string
  );

  if (loading.state) {
    return <></>;
  }

  const html = boards.state.map((m, i) => {
    if (block != null && block[m.uid] != null) {
      return <div key={i}></div>;
    }

    if (m.uid === uid.state) {
      return (
        <div key={i}>
          <RightMessage
            id={m.id}
            uid={m.uid}
            name={m.name as string}
            message={m.message}
            createdAt={moment(new Date(m.createdAt)).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          />
        </div>
      );
    }

    return (
      <div key={i}>
        <LeftMessage
          id={m.id}
          uid={m.uid}
          name={m.name as string}
          message={m.message}
          createdAt={moment(new Date(m.createdAt)).format(
            'YYYY-MM-DD HH:mm:ss'
          )}
        />
      </div>
    );
  });

  return (
    <>
      <article className="chat-container" id="_chat">
        {html}
      </article>

      <style jsx>{`
        .chat-container {
          width: 100%;
          padding: 20px 10px;
          font-size: 14px;
          background: #ffc0e6;
        }
      `}</style>
    </>
  );
};

export default Article;
