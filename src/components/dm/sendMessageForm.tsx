import { FormProvider } from 'react-hook-form';
import { useCreateDmMessage } from 'src/hooks/createDmMessage';

const SendMessageForm = (): JSX.Element => {
  const { methods, onSubmit } = useCreateDmMessage();

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          onKeyDown={(e) => e.keyCode === 13 && ''}
        >
          <div className="form-group">
            <textarea
              className="form-control"
              id="textarea"
              placeholder="メッセージ 150文字以内"
              rows={2}
              maxLength={150}
              required
              name="message"
              ref={methods.register({
                required: true,
                maxLength: 150,
              })}
            ></textarea>

            <div className="text-center">
              <input
                type="submit"
                id="submit"
                className="btn btn-primary"
                style={{ fontSize: 12 }}
                value="送信"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default SendMessageForm;
