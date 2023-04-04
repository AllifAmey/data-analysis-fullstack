import React from "react";
import { Container } from "@chakra-ui/react";
import ProjectCard from "./utility/ProjectCard";
import {
  Flex,
  Box,
  Text,
  Heading,
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";

const ProjectCardData = [
  {
    project_type: "Greentech",
    project_title: "YellowSubHydro",
    project_description: "Displaying Water Levels",
    project_image:
      "https://yellowsubhydro.com/wp-content/uploads/2023/02/YSH_wordmark_yellow-1536x520.png",
    project_url: "yellowsubhydro",
  },
  {
    project_type: "Fintech",
    project_title: "Kluster",
    project_description: "Analysing revenue and sales",
    project_image:
      "https://global-uploads.webflow.com/600b54556937c46a1c61ed30/600e06dadeb2b054991710e9_Kluster%20Logo%20Blue%20-%20144-p-500.png",
    project_url: "kluster",
  },
];

function HomePage() {
  /*
  
  // https://nicepage.com/website-design/preview/features-section-1770415?device=desktop
  
   
  
  */
  const FintechProjects = ProjectCardData.filter((project) => {
    return project.project_type === "Fintech";
  });
  const GreentechProjects = ProjectCardData.filter((project) => {
    return project.project_type === "Greentech";
  });
  //styles
  return (
    <>
      <Box h="auto" w="100%">
        <Flex
          p="2rem"
          alignItems="center"
          height="100vh"
          gap="2rem"
          width="100%"
          justifyContent="start"
          flexDirection="column"
        >
          <Heading fontSize="5xl">Our World in Data</Heading>
          <Text fontSize="2xl" w="350px" textAlign="center">
            Making data more digestible for the average user.
          </Text>
          <Flex
            width="100%"
            height="auto"
            justifyContent="space-evenly"
            textAlign="center"
          >
            <Box width="40%">
              <Flex direction="column" alignItems="center" gap="2rem">
                <Heading fontSize="2xl">Greentech</Heading>
                {GreentechProjects.map((project) => {
                  return (
                    <ProjectCard
                      key={project.project_title}
                      project_type={project.project_type}
                      project_title={project.project_title}
                      project_description={project.project_description}
                      project_image={project.project_image}
                      project_url={project.project_url}
                    />
                  );
                })}
              </Flex>
            </Box>
            <Box width="40%">
              <Flex
                direction="column"
                alignItems="center"
                gap="2rem"
                textAlign="center"
              >
                <Heading fontSize="2xl">Fintech</Heading>
                {FintechProjects.map((project) => {
                  return (
                    <ProjectCard
                      key={project.project_title}
                      project_type={project.project_type}
                      project_title={project.project_title}
                      project_description={project.project_description}
                      project_image={project.project_image}
                      project_url={project.project_url}
                    />
                  );
                })}
              </Flex>
            </Box>
          </Flex>
          <Text fontSize="xl" w="350px" textAlign="center">
            Made by Al-lif https://github.com/AllifAmey
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default HomePage;
