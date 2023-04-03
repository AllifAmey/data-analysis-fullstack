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
  
  List of code earmarked for refactoring : 

  YellowSubHyro component -
  refactor -  
  The button's styles are all the same and could be grouped under one variable
  benefit:
  allows for easier customisability over all the buttons on that page for the future
  refactor - 
  The logic for parsing the data is repeated twice.
  benefit:
  greatly improves readability and provides more control over logic handling.
  refactor -
  Group the buttons all into one component called a ButtonGroup
  benefit:
  codesplitting and localises code which maintains readability
  refactor - 
  put the line graph in a seperate component used globally.
  benefit:
  solves the issue of constantly importing the package.
   
  
  */
  //styles
  const containerStyles = { height: "auto" };
  return (
    <>
      <Container maxW="container.sm" sx={containerStyles}>
        <Flex alignItems="center" height="100vh" gap="4rem" width="100%">
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
