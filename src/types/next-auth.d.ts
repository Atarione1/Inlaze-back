import 'next-auth';

declare module 'next-auth' {
  interface session {
    user: {
      name: string;
      token: string;
    };
  }
}
