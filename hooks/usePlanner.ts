import { useState, useEffect } from 'react';

interface Planner {
  id: string;
  meals: string[];  // Example: A list of meal names for the week
  weekStartDate: string;  // Date the week starts
  // Other planner-related fields
}

export function usePlanner() {
  const [planner, setPlanner] = useState<Planner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPlanner() {
      try {
        const response = await fetch('/api/planner');
        const data = await response.json();
        setPlanner(data);
      } catch (error) {
        console.error('Error fetching planner:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanner();
  }, []);

  const updatePlanner = (updatedPlanner: Planner) => {
    setPlanner(updatedPlanner);
  };

  return { planner, loading, updatePlanner };
}
