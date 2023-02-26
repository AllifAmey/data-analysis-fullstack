import React from "react";
import ProjectCard from "./utility/ProjectCard";
import { Container } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

const ProjectCardData = [
  {
    project_title: "Kluster",
    project_description: "Analysing revenue and sales",
    project_image:
      "https://global-uploads.webflow.com/600b54556937c46a1c61ed30/600e06dadeb2b054991710e9_Kluster%20Logo%20Blue%20-%20144-p-500.png",
  },
];

function HomePage() {
  /*
  
  
  */
  //styles
  const containerStyles = { width: "100%", height: "auto" };
  return (
    <>
      <Container sx={containerStyles}>
        <Flex alignItems="center" justifyContent="center" height="100vh">
          {ProjectCardData.map((cardData) => {
            return (
              <ProjectCard
                project_title={cardData.project_title}
                project_description={cardData.project_description}
                project_image={cardData.project_image}
              />
            );
          })}
        </Flex>
      </Container>
    </>
  );
}

export default HomePage;
