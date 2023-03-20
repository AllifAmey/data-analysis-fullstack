import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function ProjectCard(props) {
  /*
  These are cards to display what each project card is.
  This will consist of the follow data:
  
  project_title - title of project
  description - brief description of Kluster
  image - picture representing the project
  project_url  - the url to the project.
  
  */
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        width="auto"
        variant="outline"
      >
        <Image
          boxSize="100px"
          src={props.project_image}
          background={`${props.project_image} no-repeat center center/cover`}
          alt="Data Analyist Project Image"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{props.project_title}</Heading>

            <Text py="2">{props.project_description}</Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              as={RouterLink}
              to={`/project/${props.project_url}`}
            >
              See Project
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}

export default ProjectCard;
