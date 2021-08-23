export const Constant = {
  title: 'すぐチャット',
  description: 'すぐに始められるチャットです',
  table: {
    boards: 'boards',
    rooms: 'rooms',
    dm_boards: 'dm_boards',
    notifications: 'notifications',
  },
  field: {
    createdAt: 'createdAt',
    name: 'name',
  },
  sort: {
    asc: 'asc',
    desc: 'desc',
  },
  api:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'https://suguchat-api2.vercel.app',
  url: {
    proxy: 'https://suguchat1.netlify.app',
    fact: 'https://suguchat1.pages.dev',
  },
} as const;
