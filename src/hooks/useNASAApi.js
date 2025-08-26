import { useState, useCallback } from "react";
import axios from "axios";
import conf from "../conf/conf";

const NASA_API_KEY = conf.nasaApiToken;
const BASE_URL = "https://api.nasa.gov/neo/rest/v1";

export const useNASAApi = () => {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNEOFeed = useCallback(async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        params: {
          start_date: startDate,
          end_date: endDate,
          api_key: NASA_API_KEY, 
        },
      });

      // Transform the nested date structure into a flat array
      const transformedData = [];
      Object.entries(response.data.near_earth_objects).forEach(
        ([date, neos]) => {
          neos.forEach((neo) => {
            transformedData.push({
              ...neo,
              approach_date: date,
            });
          });
        }
      );

      setNeoData(transformedData);
    } catch (err) {
      setError(
        "Failed to fetch NASA data. Please check your API key and try again."
      );
      console.error("NASA API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { neoData, loading, error, fetchNEOFeed };
};
