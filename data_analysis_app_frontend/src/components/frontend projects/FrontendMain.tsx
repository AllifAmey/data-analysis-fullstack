import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type FrontendProject = {
  project_name: string;
  project_description: string;
  project_url: string;
  project_has_more_info: boolean;
};

const ListFrontendProject: FrontendProject[] = [
  {
    project_name: "Empoweredwomen",
    project_description:
      "Event management system where a admin can create events and users can attend events.",
    project_url: "/frontend/EmpowerWomanHome",
    project_has_more_info: true,
  },
  {
    project_name: "HorseRacing",
    project_description:
      "Analyise Horse Racing data using https://www.theracingapi.com/",
    project_url: "/frontend/HorseRacing",
    project_has_more_info: false,
  },
];

const FrontendMain = () => {
  /*
  The purpose of this is to mimic what companies want
  
  */

  //styles

  return (
    <>
      <Flex flexDirection="column" alignItems="center" gap="3rem">
        {ListFrontendProject.map((project_data) => {
          return (
            <Card align="center" width="60%">
              <CardHeader>
                <Heading size="xl">{project_data.project_name}</Heading>
              </CardHeader>
              <CardBody>
                <Flex flexDirection="column" gap={2} alignItems="center">
                  <Text fontSize="lg">{project_data.project_description}</Text>
                  {project_data.project_has_more_info && (
                    <Text fontSize="sm">
                      Inspired by Mentell - https://www.mentell.org.uk/
                    </Text>
                  )}
                </Flex>
              </CardBody>
              <CardFooter>
                <Button
                  colorScheme="pink"
                  as={RouterLink}
                  to={`${project_data.project_url}`}
                >
                  View here
                </Button>
              </CardFooter>
            </Card>
          );
        })}

        <Button colorScheme="teal" as={RouterLink} to={"/"}>
          Back
        </Button>
      </Flex>
    </>
  );
};

export default FrontendMain;
