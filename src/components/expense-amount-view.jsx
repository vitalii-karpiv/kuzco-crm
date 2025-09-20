import PropTypes from "prop-types";
import { Typography } from "antd";

export default function ExpenseAmountView({ amount }) {
  function showPrice(amount) {
    const price = (parseFloat(amount) / 100) * -1;
    if (price > 999) {
      return String(price.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return price.toFixed(2);
  }

  return (
    <Typography.Text code strong>
      {showPrice(amount)} грн
    </Typography.Text>
  );
}

ExpenseAmountView.propTypes = {
  amount: PropTypes.string, // string representation of a date
};
