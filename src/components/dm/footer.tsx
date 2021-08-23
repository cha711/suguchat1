import SendMessageForm from 'src/components/dm/sendMessageForm';
import { UploadImageButton } from 'src/components/dm/uploadImageButton';
import { NameChangeButton } from 'src/components/chat/nameChangeButton';
import { ProfileButton } from 'src/components/chat/profileButton';

const Footer = (): JSX.Element => {
  return (
    <>
      <footer>
        <UploadImageButton />
        <NameChangeButton />
        <ProfileButton />
        <SendMessageForm />
      </footer>
    </>
  );
};

export default Footer;
