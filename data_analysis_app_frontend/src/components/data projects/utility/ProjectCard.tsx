import React, { useRef } from "react";
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type props = {
  project_type: string;
  project_title: string;
  project_description: string;
  project_image: string;
  project_url: string;
  project_has_more_info: boolean;
  project_technology_info: any;
};

const ProjectCard = ({
  project_type,
  project_title,
  project_description,
  project_image,
  project_url,
  project_has_more_info,
  project_technology_info,
}: props) => {
  /*
  These are cards to display what each project card is.
  This will consist of the follow data:
  
  project_type - the type of project.
  project_title - title of project
  project_description - brief description of Kluster
  project_image - picture representing the project
  project_url  - the url to the project.
  project_has_more_info - Booleon dictating whether extra info is needed.
  project_technology_info - different technologies uses
  
  */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
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
          src={`${project_image}`}
          alt="YellowSubHydro"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{`${project_title}`}</Heading>
            <Text py="2">{`${project_description}`}</Text>
          </CardBody>

          <CardFooter>
            <Flex
              w="100%"
              justifyContent="center"
              alignItems="center"
              direction="column"
              gap="2rem"
            >
              <Button
                variant="solid"
                colorScheme={
                  project_type === "Fintech" ? "blackAlpha" : "whatsapp"
                }
                as={RouterLink}
                to={`/project/${project_url}`}
              >
                See project
              </Button>
              {project_has_more_info && (
                <Button
                  variant="link"
                  colorScheme={
                    project_type === "Fintech" ? "blackAlpha" : "whatsapp"
                  }
                  ref={btnRef}
                  onClick={onOpen}
                >
                  More info
                </Button>
              )}
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Extra info</DrawerHeader>
                  <DrawerBody>
                    <Heading size="md">{`${project_title}`}</Heading>

                    <Text py="2">{`${project_description}`}</Text>
                    <Heading size="md">Technologies used</Heading>

                    <Text py="2">
                      {project_has_more_info
                        ? project_technology_info.join(", ")
                        : ""}
                    </Text>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default ProjectCard;
