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

const SophiaHomePage = () => {
  /**
   * Notes:
   *
   *
   *
   *
   *
   *
   *
   *
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
      <Flex h="auto" w="100%"></Flex>
    </>
  );
};

export default SophiaHomePage;
