import { atom, useRecoilState } from 'recoil';

import { Boards } from 'src/types';

class Key {
  private num = 0;

  constructor() {}

  get key(): string {
    return String(this.num++);
  }
}

const instance = new Key();

const atom_obj = {
  loading: atom({
    key: instance.key,
    default: true,
  }),
  uid: atom({
    key: instance.key,
    default: '',
  }),
  host: atom({
    key: instance.key,
    default: false,
  }),
  rname: atom({
    key: instance.key,
    default: '',
  }),
  blacklist: atom({
    key: instance.key,
    default: [] as string[],
  }),
  boards: atom({
    key: instance.key,
    default: [] as Boards[],
  }),
};

export const useCustomRecoil = () => {
  const loading = useRecoilState(atom_obj.loading);
  const uid = useRecoilState(atom_obj.uid);
  const host = useRecoilState(atom_obj.host);
  const rname = useRecoilState(atom_obj.rname);
  const blacklist = useRecoilState(atom_obj.blacklist);
  const boards = useRecoilState(atom_obj.boards);

  return {
    loading: {
      state: loading[0],
      set: loading[1],
    },
    uid: {
      state: uid[0],
      set: uid[1],
    },
    host: {
      state: host[0],
      set: host[1],
    },
    rname: {
      state: rname[0],
      set: rname[1],
    },
    blacklist: {
      state: blacklist[0],
      set: blacklist[1],
    },
    boards: {
      state: boards[0],
      set: boards[1],
    },
  };
};
