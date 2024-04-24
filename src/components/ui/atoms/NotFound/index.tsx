import {
  Button,
  Container,
  Group,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();
  function toDashboard() {
    navigate("/dashboard");
  }
  return (
    <MantineProvider>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group justify="center">
          <Button variant="subtle" size="md" onClick={toDashboard}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </MantineProvider>
  );
}
