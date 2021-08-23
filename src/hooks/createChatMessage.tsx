import { useForm, UseFormMethods } from 'react-hook-form';

import { create } from 'src/firebase/boards';
import { getRid } from 'src/util';

type FormType = {
  message: string;
};

export const useCreateChatMessage = (): {
  methods: UseFormMethods<FormType>;
  onSubmit: (data: FormType) => Promise<void>;
} => {
  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues: { message: '' },
  });

  const onSubmit = async (data: FormType) => {
    const rid = getRid();

    await create({ id: String(rid), message: data.message, image: false });

    methods.setValue('message', '');
    setTimeout(() => {
      document.getElementById('textarea')?.focus();
    }, 500);
  };

  return { methods, onSubmit };
};
