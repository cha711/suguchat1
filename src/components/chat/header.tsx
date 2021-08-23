import { useCustomRecoil } from 'src/recoil';

import { InvitationButton } from 'src/components/chat/invitationButton';
import { RoomRemoveButton } from 'src/components/chat/roomRemoveButton';

const Header = (): JSX.Element => {
  const { host } = useCustomRecoil();

  return (
    <>
      <div className="clearfix">
        <div className="float-start">
          <a href="/">ホームへ</a>
        </div>

        <div className="float-start" style={{ marginLeft: 25 }}>
          <InvitationButton />
        </div>

        {host.state === true && (
          <div className="float-end">
            <RoomRemoveButton />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
