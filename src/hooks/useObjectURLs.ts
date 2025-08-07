// hooks/useObjectURLs.ts
import { useEffect, useMemo } from "react";

export const useObjectURLs = (files: File[]) => {
  const objectURLs = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  useEffect(() => {
    return () => {
      objectURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [objectURLs]);

  return objectURLs;
};
