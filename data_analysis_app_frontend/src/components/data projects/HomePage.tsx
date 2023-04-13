import React from "react";
import ProjectCard from "./utility/ProjectCard";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";

// ? is optional but when given it has to be as defined.

type ProjectData = {
  project_type: string;
  project_title: string;
  project_description: string;
  project_image: string;
  project_url: string;
  project_has_more_info: boolean;
  project_technology_info?: string[];
};

const ProjectCardData: ProjectData[] = [
  {
    project_type: "Greentech",
    project_title: "YellowSubHydro",
    project_description: "Tracking flood severity levels",
    project_image:
      "https://yellowsubhydro.com/wp-content/uploads/2023/02/YSH_wordmark_yellow-1536x520.png",
    project_url: "yellowsubhydro",
    project_has_more_info: true,
    project_technology_info: ["Gov flood API", "MapboxGL"],
  },
  {
    project_type: "Fintech",
    project_title: "Kluster",
    project_description: "Analysing revenue and sales",
    project_image:
      "https://global-uploads.webflow.com/600b54556937c46a1c61ed30/600e06dadeb2b054991710e9_Kluster%20Logo%20Blue%20-%20144-p-500.png",
    project_url: "kluster",
    project_has_more_info: false,
  },
];

const HomePage = () => {
  /*
  
  // https://nicepage.com/website-design/preview/features-section-1770415?device=desktop

  Coding philosophy reminder:

  Explicit over implicit . 

  https://stackoverflow.com/questions/65993004/how-to-use-usestate-hook-in-react-with-typescript-correctly
  
  
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
                      project_has_more_info={project.project_has_more_info}
                      project_technology_info={project.project_technology_info}
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
                      project_has_more_info={project.project_has_more_info}
                      project_technology_info={project.project_technology_info}
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
};

export default HomePage;
