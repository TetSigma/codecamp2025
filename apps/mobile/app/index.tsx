import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { UIScreen } from '@/components/atoms';
import { UILoader } from '@/components/atoms/UILoader';
import { useUserStore } from '@/stores';

export default function Home() {
  const [isReady, setIsReady] = useState(false); 
  const user = useUserStore((state) => state.user); 
  const router = useRouter();
  console.log(user)

  useEffect(() => {
    setIsReady(true); 
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (user === null) {
      router.push('/welcome');
    } else {
      router.push('/dashboard'); 
    }
  }, [user, router, isReady]);

  if (!isReady || user === null) {
    return (
      <UIScreen>
        <UILoader />
      </UIScreen>
    );
  }

  return (
    <UIScreen>
      <UILoader />
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
