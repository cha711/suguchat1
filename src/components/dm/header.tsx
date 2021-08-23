import { getRid } from 'src/util';

const Header = (): JSX.Element => {
  const rid = getRid();
  return (
    <>
      <div className="clearfix">
        <div className="float-start">
          <a href="/">ホームへ</a>
        </div>

        <div className="float-start" style={{ marginLeft: 25 }}>
          <a href={`/chat?id=${rid}`}>部屋へ戻る</a>
        </div>
      </div>

      <hr style={{ margin: 0 }} />
    </>
  );
};

export default Header;
