import { AppShell, NavLink, ScrollArea } from "@mantine/core";
import { IconLogout2 } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const SideNav: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppShell.Section grow component={ScrollArea}>
        {children}
      </AppShell.Section>
      <AppShell.Section>
        <NavLink
          label="Exit Property Chart"
          variant="light"
          color="red"
          leftSection={<IconLogout2 size={16} />}
          active
          component={Link as any}
          to="/dashboard/properties"
        />
      </AppShell.Section>
    </>
  );
};

export default SideNav;
