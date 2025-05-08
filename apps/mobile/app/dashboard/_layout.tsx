import React from 'react';
import { Stack } from 'expo-router'; 
import UITabBarContainer from '@/components/molecules/UITabBarContainer';

export default function CustomBottomTab() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <UITabBarContainer />
    </>
  );
}