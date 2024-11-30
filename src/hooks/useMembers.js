import { useState, useEffect } from "react";
import { fetchApiData } from "../utils/api";

const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData();
      setMembers(data);
      setFilteredMembers(data);
    };
    fetchData();
  }, []);

  return { members, filteredMembers, setFilteredMembers };
};

export default useMembers;