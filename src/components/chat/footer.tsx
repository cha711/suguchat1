import SendMessageForm from 'src/components/chat/sendMessageForm';
import { UploadImageButton } from 'src/components/chat/uploadImageButton';
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
