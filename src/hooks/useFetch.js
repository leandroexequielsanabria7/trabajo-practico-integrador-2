import { useEffect, useState } from "react";

const getErrorMessage = (status) => {
  if (status === 401) return "Tu sesión no existe o expiró. Volvé a iniciar sesión.";
  if (status === 403) return "No tenés permisos para ver este recurso.";
  return "Ocurrió un error en el servidor. Intentá más tarde.";
};

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(getErrorMessage(response.status));
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "No se pudo conectar con el servidor."
          : err.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
   
  }, [url]);

  return { data, isLoading, error };
};