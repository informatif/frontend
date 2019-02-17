import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `Informatif — ${title}`;
  }, [title]);
}
