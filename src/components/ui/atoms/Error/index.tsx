import {
  Button,
  Container,
  Group,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { Link, useRouteError } from "react-router-dom";
import classes from "./Error.module.css";

export default function Error() {
  const error = useRouteError() as any;

  let errorCode;
  let errorTitle;
  let errorMessage;

  if (error?.response) {
    if (error.response.status) errorCode = error.response.status;
    if (error.response.statusText) errorTitle = error.response.statusText;
    if (error.response.data.message) errorMessage = error.response.data.message;
  } else {
    errorCode = error.code;
    errorTitle = error.message;
    errorMessage = (
      <>
        Our servers could not handle your request. Don&apos;t worry, our
        development team was already notified. Try refreshing the page.
      </>
    );
  }
  return (
    <MantineProvider>
      <div className={classes.root}>
        <Container>
          <div className={classes.label}>{errorCode}</div>
          <Title className={classes.title}>{errorTitle}</Title>
          <Text size="lg" ta="center" className={classes.description}>
            {errorMessage}
          </Text>
          <Group justify="center">
            <Button variant="white" size="md" component={Link} to={"/auth/login"}>
              Go to login page
            </Button>
          </Group>
        </Container>
      </div>
    </MantineProvider>
  );
}
