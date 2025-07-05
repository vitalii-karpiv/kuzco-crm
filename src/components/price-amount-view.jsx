import PropTypes from 'prop-types';
import {Typography} from "antd";
import * as FinanceManager from "../helpers/finance-manager.js";

export default function PriceAmountView({amount}) {
    return <Typography.Text code strong>{FinanceManager.prettifyNumber(amount)} грн</Typography.Text>
}

PriceAmountView.propTypes = {
    amount: PropTypes.string, // string representation of a date
}
