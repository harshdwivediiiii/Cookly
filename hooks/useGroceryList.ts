import { useState, useEffect } from 'react';

interface GroceryItem {
  name: string;
  quantity: string;
}

export function useGroceryList(plannerId: string) {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchGroceryList() {
      try {
        const response = await fetch(`/api/grocery?plannerId=${plannerId}`);
        const data = await response.json();
        setGroceryList(data);
      } catch (error) {
        console.error('Error fetching grocery list:', error);
      } finally {
        setLoading(false);
      }
    }

    if (plannerId) {
      fetchGroceryList();
    }
  }, [plannerId]);

  const addItem = (item: GroceryItem) => {
    setGroceryList([...groceryList, item]);
  };

  const removeItem = (itemName: string) => {
    setGroceryList(groceryList.filter(item => item.name !== itemName));
  };

  return { groceryList, loading, addItem, removeItem };
}
