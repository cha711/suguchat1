import { useForm, UseFormMethods } from 'react-hook-form';

import { create_dm_id, getUid } from 'src/firebase';
import { create as create_dm_boards } from 'src/firebase/dm_boards';
import { create as create_notifications } from 'src/firebase/notifications';
import { getPartner, getRid } from 'src/util';

import { Constant } from 'src/constant';

type FormType = {
  message: string;
};

export const useCreateDmMessage = (): {
  methods: UseFormMethods<FormType>;
  onSubmit: (data: FormType) => Promise<void>;
} => {
  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues: { message: '' },
  });

  const onSubmit = async (data: FormType) => {
    try {
      const partner = getPartner();
      const rid = getRid();

      await create_dm_boards({
        id: await create_dm_id(partner as string),
        message: data.message,
        image: false,
      });

      methods.setValue('message', '');
      setTimeout(() => {
        document.getElementById('textarea')?.focus();
      }, 500);

      const message =
        process.env.NODE_ENV === 'production'
          ? `DM送りました\n${
              Constant.url.proxy
            }/dm?id=${rid}&partner=${await getUid()}`
          : `DM送りました\n${location.protocol}//${
              location.host
            }/dm?id=${rid}&partner=${await getUid()}`;

      await create_notifications({
        id: rid as string,
        partner: partner as string,
        message: message,
      });
    } catch (error) {}
  };

  return { methods, onSubmit };
};
