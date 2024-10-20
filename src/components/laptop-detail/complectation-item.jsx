import {Typography} from "antd";
import PropTypes from "prop-types";

export default function ComplectationItem({stockType, stockList}) {
    return (
        <>
            <Typography.Text>- {stockType}:</Typography.Text>
            <br />
            {stockList.filter(stockItem => stockItem.type === stockType).map(stockItem => {
                return <div key={stockItem.code}>
                    <span className={"font-bold"}>{stockItem.code}</span>{" "}
                    <span className={"text-xl"}>{stockItem.name}</span>{" "}
                    <span className={"text-white bg-green-900"}>{stockItem.price} </span>
                </div>
            })}
            </>
        )
}

ComplectationItem.propTypes = {
    stockType: PropTypes.string.isRequired,
    stockList: PropTypes.array.isRequired,
}