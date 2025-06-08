import {
  Box,
  Paper,
  Group,
  Skeleton,
  Stack,
  Divider,
  useMantineTheme,
  useComputedColorScheme,
  alpha,
} from "@mantine/core";
import React from "react";

type BannerloadingSkeletonProps = {};
const BannerloadingSkeleton: React.FC<BannerloadingSkeletonProps> = ({}) => {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();

  const getBannerBackground = () => {
    if (colorScheme === "dark") {
      return `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[7]} 50%, ${theme.colors.dark[6]} 100%)`;
    }
    return `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${alpha(
      theme.colors.blue[0],
      0.3
    )} 50%, ${theme.colors.gray[1]} 100%)`;
  };
  return (
    <Box>
      <Paper
        p="md"
        mb={0}
        style={{
          background: getBannerBackground(),
        }}
      >
        <Group justify="space-between" align="flex-start">
          <Group gap="md" style={{ flex: 1 }}>
            <Skeleton radius="xs" w={50} h={50} />
            <Stack gap="xs" style={{ flex: 1 }}>
              <Group gap="xs" align="center">
                <Skeleton w={250} h={28} />
                <Skeleton radius="xl" h={22} w={70} />
              </Group>
              <Skeleton w={200} h={16} radius="xl" />
            </Stack>
          </Group>
          <Group gap="xs" visibleFrom="sm">
            <Skeleton w={100} h={36} radius="sm" />
            <Skeleton w={36} h={36} radius="sm" />
          </Group>
          <Group gap="xs" hiddenFrom="sm">
            <Skeleton w={36} h={36} radius="sm" />
          </Group>
        </Group>
      </Paper>
      <Divider />
    </Box>
  );
};

export default BannerloadingSkeleton;
