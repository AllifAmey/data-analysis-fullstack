import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Bar } from "react-chartjs-2";

const RunnersBarChart = (props: any) => {
  /**
   * Bar chart showing all the horse data for a particular race.
   *
   *
   */

  const [graphData, setGraphData] = useState<any>([]);
  const [labels, setLabels] = useState<any>([]);

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Showcasing all the horses for ${props.data.race_name}`,
        padding: {
          bottom: 20,
        },
        font: {
          size: 36,
          family: "Helvetica Neue",
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Jockey Weight",
          font: {
            size: 20,
            style: "italic",
            family: "Helvetica Neue",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Horse Names",
          font: {
            size: 20,
            style: "italic",
            family: "Helvetica Neue",
          },
        },
      },
    },
  };

  useEffect(() => {
    const runners = props.data.runners;
    runners.sort(function (a: any, b: any) {
      return a.jockey_weight - b.jocket_weight;
    });
    const labels = runners.map((runner: any) => runner.horse_name);
    const dataset = runners.map((runner: any) => Number(runner.jockey_weight));
    setGraphData(dataset);
    setLabels(labels);
  }, []);

  // <Bar />
  return (
    <>
      <Modal onClose={props.onClose} size="full" isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Horse data for {`${props.data.race_name}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Bar
              options={options}
              datasetIdKey="Id"
              data={{
                labels: labels,
                datasets: [
                  {
                    label: `Horse data for ${props.data.race_name}`,
                    data: [...graphData],
                  },
                ],
              }}
            />
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-evenly">
            <Button onClick={props.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RunnersBarChart;
