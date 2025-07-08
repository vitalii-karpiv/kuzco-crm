import LaptopService from "../api/services/laptop-service.js";
import LaptopManager from "../helpers/laptop-manager.js";
import {useEffect, useState} from "react";
import ToBuy from "../components/dashboard/to-buy.jsx";
import AssignedLaptopList from "../components/dashboard/assigned-laptop-list.jsx";
import {useUserContext} from "../components/user-context.jsx";
import CounterpartyOrderList from "../components/dashboard/counterparty-order-list.jsx";
import AssignedSaleList from "../components/dashboard/assigned-sale-list.jsx";


export default function Dashboard() {
    document.title = "Dashboard";
    const [laptopsToBuy, setLaptopsToBuy] = useState();
    const [assignedLaptops, setAssignedLaptops] = useState();
    const { me } = useUserContext();

    useEffect(() => {
        getToBuyItems()
        getAssignedLaptops()
    }, [])

    async function getToBuyItems() {
        const listDtoOut = await LaptopService.list({state: LaptopManager.getActiveStates(), toBuy: true})
        setLaptopsToBuy(listDtoOut.itemList)
    }

    async function getAssignedLaptops() {
        const listDtoOut = await LaptopService.list({state: LaptopManager.getActiveStates(), assignee: me._id})
        setAssignedLaptops(listDtoOut.itemList)
    }

    return (
        <div className={"flex flex-col w-full"}>
            <div className={"w-full flex"}>
                {   laptopsToBuy &&
                    <ToBuy laptops={laptopsToBuy}/>
                }
                {
                    assignedLaptops &&
                    <AssignedLaptopList laptops={assignedLaptops} />
                }
            </div>
            <div className={"w-full flex"}>
                <CounterpartyOrderList/>
                <AssignedSaleList />
            </div>
        </div>
    )
}