import {Card, Typography} from "antd";
import stockManager from "../../helpers/stock-manager.js";
import ComplectationItem from "./complectation-item.jsx";
import PropTypes from "prop-types";

export default function ComplectationBlock({stockList, setStockList}) {

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4 mr-3"}>
            <Typography.Title level={4}>Complectation</Typography.Title>
            {stockList && stockManager.getStockTypeList().map((type) => {
                return <ComplectationItem key={type} stockType={type} stockList={stockList} setStockList={setStockList}/>
            })}
        </Card>
    )
}

ComplectationBlock.propTypes = {
    stockList: PropTypes.array.isRequired,
    setStockList: PropTypes.func.isRequired,
}
