import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';

export function useSyncUser() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        // First check if user exists
        const checkResponse = await fetch(`http://localhost:8000/api/users/${user.id}`);
        
        if (checkResponse.status === 404) {
          // User doesn't exist, create new user
          const response = await fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: user.id, // Use Clerk's user ID
              name: user.fullName || user.username || 'Anonymous User',
              email: user.primaryEmailAddress?.emailAddress || '',
              password: 'clerk-auth', // Since we're using Clerk for auth
              location: null, // Can be updated later
              streak: 0,
              mood: null
            }),
          });

          if (!response.ok) {
            console.error('Failed to create user in database');
          }
        }
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    syncUser();
  }, [isSignedIn, user]);
}