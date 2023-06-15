const RacePrizeRender = (props: any) => {
  /**
   * Display horse racing data
   *
   *
   */
  console.log("may local string yo");
  const prize = Number(props.data.race_prize).toLocaleString("en-GB");
  return (
    <>
      <div>{`£${prize}`}</div>
    </>
  );
};

export default RacePrizeRender;
