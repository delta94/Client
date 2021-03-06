import React, { useContext, useState, useCallback } from 'react';
import { TMemo } from '@shared/components/TMemo';
import _noop from 'lodash/noop';
import { useIsMobile } from '@web/hooks/useIsMobile';

/**
 * 记录选中团的UUID
 */

interface SidebarContextProps {
  showSidebar: boolean;
  switchSidebar: () => void;
}
const SidebarContext = React.createContext<SidebarContextProps>({
  showSidebar: true,
  switchSidebar: _noop,
});
SidebarContext.displayName = 'SidebarContext';

export const SidebarContextProvider: React.FC = TMemo((props) => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  const switchSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  return (
    <SidebarContext.Provider value={{ showSidebar, switchSidebar }}>
      {props.children}
    </SidebarContext.Provider>
  );
});
SidebarContextProvider.displayName = 'SidebarContextProvider';

export function useSidebarContext(): SidebarContextProps {
  const context = useContext(SidebarContext);

  return context;
}
