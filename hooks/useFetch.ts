import { useState, useEffect } from 'react';


/**
 * Usage:
 * 
 * const FetchComponent = () => {
 * const { data, loading, error } = useFetch('https://api.example.com/data');
 * if (loading) return <ActivityIndicator />;
 * if (error) return <Text>Error: {error.message}</Text>;
 * return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  *);
};
 */
const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;