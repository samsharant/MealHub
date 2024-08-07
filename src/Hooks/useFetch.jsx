import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, shouldFetch) {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.data) setResponseData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { responseData, loading, error };
}

export default useFetch;
