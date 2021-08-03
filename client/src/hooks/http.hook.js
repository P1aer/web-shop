import { useCallback, useState } from "react";

const useHttp = () => {
    const [loading, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoad(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Что-то не так");
            }
            setLoad(false);
            return data;
        } catch (e) {
            setLoad(false);
            setError(e.message);
            throw e;
        }
    }, []);
    const clearError = useCallback(() => setError(null),[])
    return { loading, request, error, clearError };
};

export default useHttp;
