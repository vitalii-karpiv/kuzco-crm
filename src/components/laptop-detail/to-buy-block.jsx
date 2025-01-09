import {Button, Card, Input, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import LaptopService from "../../api/services/laptop-service.js";
import {useState} from "react";
import PropTypes from "prop-types";


export default function ToBuyBlock({laptop = {}, setStockOpt, setLaptop}) {

    const [addToBuyItemActive, setAddToBuyItemActive] = useState(false);
    const [newToBuyItem, setNewToBuyItem] = useState("");

    const handleNewToBuy = async () => {
        if (!laptop || newToBuyItem === "") return;
        const newToBuy = [...laptop.toBuy, newToBuyItem];
        const dtoIn = {
            id: laptop._id,
            toBuy: newToBuy
        }
        let updateResult;
        try {
            updateResult = await LaptopService.update(dtoIn);
        } catch (e) {
            console.log("TODO: handle error", e)
            return;
        }
        setLaptop(updateResult);
        setNewToBuyItem("");
        setAddToBuyItemActive(false);
    }

    const handleRemoveToBuy = async (index) => {
        laptop.toBuy.splice(index, 1);
        const dtoIn = {
            id: laptop._id,
            toBuy: laptop.toBuy
        }
        let updateResult;
        try {
            updateResult = await LaptopService.update(dtoIn);
        } catch (e) {
            console.log("TODO: handle error", e)
            return;
        }
        setLaptop(updateResult);
    }

    const cancelAddNewItem = () => {
        setAddToBuyItemActive(false);
        setNewToBuyItem("");
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-1/3"}>
            <div className={"flex justify-between align-middle"}>
                <Typography.Title level={4}>To buy</Typography.Title>
                <Button size={"small"} onClick={() => setAddToBuyItemActive(true)}><FontAwesomeIcon
                    icon={faPlus}/></Button>
            </div>
            {laptop.toBuy.map((item, index) => {
                return (
                    <div className={"flex align-middle justify-between mb-2"} key={item + index}>
                        <Typography.Text>- {item}</Typography.Text>
                        <div>
                            <Button className={"bg-rose-400 text-white mr-1"} size={"small"}
                                    onClick={() => handleRemoveToBuy(index)}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </Button>
                            <Button size={"small"}
                                    onClick={() => setStockOpt({
                                        show: true,
                                        index: index
                                    })}><FontAwesomeIcon
                                icon={faCheck}/>
                            </Button>
                        </div>
                    </div>
                )
            })}
            {addToBuyItemActive && <div className={"flex justify-between align-middle"}>
                <Input className={"mr-2"} value={newToBuyItem} onChange={(e) => setNewToBuyItem(e.target.value)}/>
                <Button size={"small"} className={"bg-rose-400 text-white mr-1"} onClick={cancelAddNewItem}><FontAwesomeIcon icon={faXmark}/> </Button>
                <Button size={"small"} className={"bg-emerald-500 text-white"} onClick={handleNewToBuy} ><FontAwesomeIcon icon={faPlus}/> </Button>
            </div>}
        </Card>
    )

}

ToBuyBlock.propTypes = {
    laptop: PropTypes.object.isRequired,
    setStockOpt: PropTypes.func.isRequired,
    setLaptop: PropTypes.func.isRequired,
}