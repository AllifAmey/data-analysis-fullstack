const RacePrizeRender = (props: any) => {
  /**
   * Display horse racing data
   *
   *
   */
  const currency = props.data.race_prize.charAt(0);
  const prize = Number(props.data.race_prize.substring(1)).toLocaleString(
    "en-GB"
  );
  return (
    <>
      <div>{`${currency}${prize}`}</div>
    </>
  );
};

export default RacePrizeRender;
