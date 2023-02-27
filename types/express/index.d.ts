declare namespace Express {
  export interface Request {
    decodedToken: {
      uid: string;
    };
  }
}
