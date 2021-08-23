import reactStringReplace from 'react-string-replace';

const Message = (params: { message: string }): JSX.Element => {
  return (
    <>
      <>
        {reactStringReplace(
          params.message,
          /(https?:\/\/\S+)/g,
          (match: string, j: number) => (
            <a href={match} key={match + j}>
              {match}
            </a>
          )
        )}
      </>
    </>
  );
};

export default Message;
