import { useRouter } from 'next/router';
import Head from 'next/head';

export const Loading = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/chat' && (
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
      )}

      <div className="position-absolute h-100 w-100 m-0 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    </>
  );
};
