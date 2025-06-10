import React from "react";
import { PropertyMedia } from "../types";
import { Button, Card, Grid, Image, Stack, Text, Title } from "@mantine/core";
import { getHiveFileUrl } from "@hive/esm-core-api";
import { openModal } from "@mantine/modals";

type MediaGridViewProps = {
  media: Array<PropertyMedia>;
};

const MediaGridView: React.FC<MediaGridViewProps> = ({ media }) => {
  return (
    <Grid>
      {media.map((m) => {
        const img = getHiveFileUrl(m.url);

        return (
          <Grid.Col key={m.id} span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              p={0}
              radius={"md"}
              h={"100%"}
              role="button"
              onClick={() =>
                openModal({
                  fullScreen: true,
                  title: m.title,
                  children: (
                    <Image
                      src={img}
                      fit="contain"
                      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                      w={"100%"}
                      h={"100%"}
                    />
                  ),
                })
              }
            >
              <Image
                src={img}
                fit="cover"
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                w={"100%"}
                height={"300"}
              />
              <Stack p={"md"}>
                <Title order={6}>{m.title || "No title"}</Title>
                <Text c={"dimmed"}>{m.description || "No Caption"}</Text>
              </Stack>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default MediaGridView;
