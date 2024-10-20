// app/error.tsx

"use client";

import { useEffect } from "react";
// import styles from "./styles/Error.module.css";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div >
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
