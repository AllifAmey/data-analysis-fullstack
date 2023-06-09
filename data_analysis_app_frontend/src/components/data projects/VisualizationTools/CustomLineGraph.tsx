import { Line } from "react-chartjs-2";

/*
TODO: define the props 
type props = {
  example: string;
};

const CustomLineGraph = ({ example }: props) => {
*/

function CustomLineGraph(props: any) {
  /*
  Custom Line Graph using ChartJS
  
  */
  return (
    <>
      <Line options={props.options} data={props.data} />
    </>
  );
}

export default CustomLineGraph;
