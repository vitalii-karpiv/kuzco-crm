import {Button, Typography} from "antd";
import PropTypes from "prop-types";
import StockManager from "../../helpers/stock-manager.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import StockService from "../../api/services/stock-service.js";
import {useState} from "react";

const {Text} = Typography;

export default function ComplectationItem({stockType, stockList, setStockList}) {
    const [showAddStockModal, setShowAddStockModal] = useState(false);

    function handleShowAddStockModal() {
        console.log("stockType", stockType)
        setShowAddStockModal(true);
    }

    async function handleRemoveStockItem(stockItem) {
        await StockService.update({id: stockItem._id, state: StockManager.getStockStateMap().FREE})
        setStockList(stockList.filter(item => item._id !== stockItem._id))
    }

    return (
        <div className={"my-2"}>
            <div className={"flex justify-between align-middle"}>
                <Typography.Title level={5} style={{
                    margin: 0,
                    padding: 0
                }}>- {StockManager.getStockTypeLabel(stockType)}:</Typography.Title>
                <Button className={""} size={"small"} onClick={() => handleShowAddStockModal(stockType)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
            </div>
            {stockList.filter(stockItem => stockItem.type === stockType).map(stockItem => {
                return (
                    <div className={"flex justify-between align-middle border-1 border-indigo-400 bg-indigo-50 rounded p-1 m-1 w-3/4"} key={stockItem.code}>
                        <div>
                            <Text code>{stockItem.code}</Text>
                            <Text strong className={"mx-2"}>{stockItem.name}</Text>
                            <Text code type="success">{stockItem.price} грн</Text>
                        </div>
                        <div>
                            <Button className={""} size={"small"} onClick={() => handleRemoveStockItem(stockItem)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

ComplectationItem.propTypes = {
    stockType: PropTypes.string.isRequired,
    stockList: PropTypes.array.isRequired,
    setStockList: PropTypes.func.isRequired,
}