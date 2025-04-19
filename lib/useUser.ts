import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) setUser(null);

        const data = await res.json();
        setUser(data.user); // Set the user data
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null); // Ensure user is set to null if fetch fails
      } finally {
        setIsLoaded(true); // Set isLoaded to true once the fetch is complete
      }
    }

    fetchUser();
  }, []);

  return { user, isLoaded };
}
