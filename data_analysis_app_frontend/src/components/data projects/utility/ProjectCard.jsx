import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
function ProjectCard(props) {
  /*
  These are cards to display what each project card is.
  This will consist of the follow data:
  
  project_title - title of project
  project_description - brief description of Kluster
  project_image - picture representing the project
  project_url  - the url to the project.
  project_type - the type of project.
  
  */
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="contain"
          maxW={{ base: "100%", sm: "200px" }}
          h="200px"
          src={`${props.project_image}`}
          alt="YellowSubHydro"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{`${props.project_title}`}</Heading>

            <Text py="2">{`${props.project_description}`}</Text>
          </CardBody>

          <CardFooter>
            <Flex w="100%" justifyContent="center">
              <Button
                variant="solid"
                colorScheme={
                  props.project_type === "Fintech" ? "blackAlpha" : "whatsapp"
                }
                as={RouterLink}
                to={`/project/${props.project_url}`}
              >
                See project
              </Button>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}

export default ProjectCard;
