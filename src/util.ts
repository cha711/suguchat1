export const getRid = (): string | null => {
  const url = new URL(window.location.href);
  const rid = url.searchParams.get('id');

  if (rid == null) {
    return null;
  }

  return rid;
};

export const getPartner = (): string | null => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('partner');

  if (id == null) {
    return null;
  }

  return id;
};
