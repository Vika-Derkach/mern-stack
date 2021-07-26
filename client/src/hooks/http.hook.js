//з сервером
import { useCallback, useState } from "react";
const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          //щоб розуміти що ми саме json передаємо
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something wrong heppened");
        }
        setLoading(false);
        return data;
      } catch (e) {
        console.log("catch", e.message);
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);
  return { loading, request, error, clearError };
};
export default useHttp;
