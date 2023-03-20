import React from "react";
import ProjectCard from "./utility/ProjectCard";
import { Container } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

const ProjectCardData = [
  {
    project_title: "YellowSubHydro",
    project_description: "Displaying Water Levels",
    project_image:
      "https://yellowsubhydro.com/wp-content/uploads/2023/02/YSH_wordmark_yellow-1536x520.png",
    project_url: "yellowsubhydro",
  },
  {
    project_title: "Kluster",
    project_description: "Analysing revenue and sales",
    project_image:
      "https://global-uploads.webflow.com/600b54556937c46a1c61ed30/600e06dadeb2b054991710e9_Kluster%20Logo%20Blue%20-%20144-p-500.png",
    project_url: "kluster",
  },
];

function HomePage() {
  /*
  
  
  */
  //styles
  const containerStyles = { height: "auto" };
  return (
    <>
      <Container maxW="container.sm" sx={containerStyles}>
        <Flex alignItems="center" height="100vh" gap="4rem" width="100vw">
          {ProjectCardData.map((cardData) => {
            return (
              <ProjectCard
                project_title={cardData.project_title}
                project_description={cardData.project_description}
                project_image={cardData.project_image}
                project_url={cardData.project_url}
              />
            );
          })}
        </Flex>
      </Container>
    </>
  );
}

export default HomePage;
