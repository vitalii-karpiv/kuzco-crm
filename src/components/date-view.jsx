import PropTypes from "prop-types";

export default function DateView({ dateStr, showTime = false }) {
  if (!dateStr) {
    return <div>-</div>;
  }
  const date = new Date(dateStr);

  const addZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <span>
      {date.getFullYear()}-{addZero(date.getMonth() + 1)}-{addZero(date.getDate())}{" "}
      {showTime && `${date.getHours()}:${addZero(date.getMinutes())}`}
    </span>
  );
}

DateView.propTypes = {
  dateStr: PropTypes.string, // string representation of a date
  showTime: PropTypes.bool,
};
