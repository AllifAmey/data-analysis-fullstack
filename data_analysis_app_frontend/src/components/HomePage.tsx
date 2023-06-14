import ProjectCard from "./data projects/utility/ProjectCard";
import { Flex, Box, Text, Heading, Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

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
  {
    project_type: "Fintech",
    project_title: "CryptoFinance",
    project_description: "Displaying crypto finance data using Binance",
    project_image:
      "https://media.microbilt.com/Cms_Data/Contents/MBNewsBlogs/Media/MB/FinancialData23.jpg?width=730&height=335&mode=carve",
    project_url: "CryptoFinance",
    project_has_more_info: false,
  },
];

const HomePage = () => {
  /*
  
  // https://nicepage.com/website-design/preview/features-section-1770415?device=desktop

  Coding philosophy reminder:

  Explicit over implicit . 

  https://stackoverflow.com/questions/65993004/how-to-use-usestate-hook-in-react-with-typescript-correctly
  
  Design change - 

  I envision using tabs example code -

    <Tabs variant='unstyled'>
    <TabList>
      <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Tab 1</Tab>
      <Tab _selected={{ color: 'white', bg: 'green.400' }}>Tab 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>

  Greentech and fintech. Make things more stylist and orderly. This should do.

  take inspiration from and mimic design closely:
  https://yellowsubhydro.com/wp-content/uploads/2023/02/Screenshot-2023-02-03-at-15.10.03-1536x891.png
  use fontawesome for the tabs
  
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
      <Flex h="auto" w="100%">
        <Flex
          width="20%"
          direction="column"
          gap="2rem"
          padding="1rem"
          justifyContent="center"
          lineHeight="2rem"
        >
          <Text fontSize="44" textAlign="center">
            Al-lif Amey
          </Text>
          <Text fontSize="24" textAlign="center">
            Full Stack Developer
          </Text>

          <Text>
            I created AmeyDataWorld because I want others to understand raw data
            more easily.
            <br />
            <br />
            There is so much valuable information out waiting to be processed
            and transformed. That is where I am in. Here are my projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
            <br /> <br />
            Enjoy!
          </Text>
          <Link href="https://github.com/AllifAmey" alignSelf="center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 496 512"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </Link>
        </Flex>
        <Flex
          p="2rem"
          alignItems="center"
          height="100vh"
          gap="2rem"
          width="80%"
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
          <Button
            variant="text"
            colorScheme="cyan"
            as={RouterLink}
            to={"/mimics"}
          >
            Frontend Projects
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default HomePage;
