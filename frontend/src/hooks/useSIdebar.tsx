import { useState, useCallback } from 'react';

type UseSidebarReturn = [boolean, () => void];

const useSidebar = (initialVisibility: boolean = false): UseSidebarReturn => {
  const [isSidebarVisible, setSidebarVisible] =
    useState<boolean>(initialVisibility);

  const toggleSidebar = useCallback(() => {
    setSidebarVisible((prevVisibility) => !prevVisibility);
  }, []);

  return [isSidebarVisible, toggleSidebar];
};

export default useSidebar;
