import { useEffect } from 'react';

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Зависимость от title, чтобы обновлять заголовок при изменении title
}

export default useDocumentTitle;