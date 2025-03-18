import LaptopService from "../api/services/laptop-service.js";
import LaptopManager from "../helpers/laptop-manager.js";
import {useEffect, useState} from "react";
import ToBuy from "../components/dashboard/to-buy.jsx";
import AssignedLaptopList from "../components/dashboard/assigned-laptop-list.jsx";


export default function Dashboard() {
    const [laptopsToBuy, setLaptopsToBuy] = useState();
    const [assignedLaptops, setAssignedLaptops] = useState();

    useEffect(() => {
        getToBuyItems()
        getAssignedLaptops()
    }, [])

    async function getToBuyItems() {
        const listDtoOut = await LaptopService.list({state: LaptopManager.getActiveStates(), toBuy: true})
        setLaptopsToBuy(listDtoOut.itemList)
    }

    async function getAssignedLaptops() {
        const listDtoOut = await LaptopService.list({state: LaptopManager.getActiveStates(), assignee: "6620304ce95e43d6b4657c22"})
        setAssignedLaptops(listDtoOut.itemList)
    }

    return (
        <div className={"w-full ml-2 flex"}>
            {   laptopsToBuy &&
                <ToBuy laptops={laptopsToBuy}/>
            }
            {
                assignedLaptops &&
                <AssignedLaptopList laptops={assignedLaptops} />
            }
        </div>)
}