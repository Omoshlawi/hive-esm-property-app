import { AppShell, ScrollArea } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const SideNav: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppShell.Section grow component={ScrollArea}>
        {children}
      </AppShell.Section>
    </>
  );
};

export default SideNav;
