import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = (dataUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(dataUrl, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
        }
      } finally {
        isMounted &&
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
      }
    };
    fetchData();

    const cleanUP = () => {
      isMounted = true;
      source.cancel();
    };

    return cleanUP;
  }, [dataUrl]);

  return { isLoading, fetchError, data };
};

export default useAxiosFetch;
