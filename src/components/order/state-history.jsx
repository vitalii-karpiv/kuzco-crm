import PropTypes from "prop-types";
import {Card, Typography} from "antd";
import OrderManager from "../../helpers/order-manager.js";
import DateView from "../date-view.jsx";

export default function StateHistory({order = {}}) {

    return (
        <Card bordered={false} hoverable={true} className={"w-2/4"}>
            <div className={"flex justify-between"}>
                <Typography.Title level={4}>State history</Typography.Title>
            </div>
            <div className={"my-2"}>
                {order.stateHistory.reverse().map((state) => {
                    return <div key={state.timestamp} className={"bg-slate-300 p-3 rounded-lg my-3"}>
                        {OrderManager.getOrderStateLabel(state.state)} <DateView dateStr={state.timestamp} showTime/> {state.initiator}
                    </div>
                })}
            </div>
        </Card>
    )
}

StateHistory.propTypes = {
    order: PropTypes.object.isRequired,
}