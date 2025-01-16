import {useParams} from "react-router-dom";
import {Card, Input, Select} from "antd";
import {useEffect, useState} from "react";
import StockService from "../api/services/stock-service.js";
import Loading from "../components/loading.jsx";
import StockManager from "../helpers/stock-manager.js";
import LaptopService from "../api/services/laptop-service.js";
import LaptopManager from "../helpers/laptop-manager.js";

export default function StockDetail() {
    let {id} = useParams();

    const [stock, setStock] = useState();
    const [laptop, setLaptop] = useState();
    const [laptopList, setLaptopList] = useState([]);

    useEffect(() => {
        loadStock()
    }, []);

    useEffect(() => {
        if (stock) {
            loadLaptopList()
        }
    }, [stock, id]);

    async function loadStock() {
        const stock = await StockService.get(id);
        if (stock.laptopId) {
            loadLaptop(stock.laptopId);
        }
        setStock(stock);
    }

    async function loadLaptopList() {
        const laptopList = await LaptopService.list({state: LaptopManager.getActiveStates()});
        setLaptopList(laptopList.itemList.filter(laptop => laptop._id !== stock?.laptopId));
    }

    async function loadLaptop(laptopId) {
        const laptop = await LaptopService.get(laptopId);
        setLaptop(laptop);
    }

    async function handleSaveProperty(property, value) {
        const dto = {id, [property]: value};
        if (property === "state" && value === StockManager.getStockStateMap().FREE) {
            dto.laptopId = null;
        }
        const newStock = await StockService.update(dto);
        setStock(newStock)
    }

    console.log("laptopList", laptopList)
    if (!stock || !laptopList || (stock.laptopId && !laptop)) {
        return <Loading />
    }

    return (
        <Card bordered={false} hoverable={true} className={"w-full mx-3"} title={stock.name}>
            <div className={"flex mb-2"}>
                <p className={""}>Code: </p>
                <Input
                    className={"w-56 ml-2"}
                    defaultValue={stock.code}
                    size={"small"}
                    readOnly={true}
                />
            </div>
            <div className={"flex mb-2"}>
                <p className={""}>Price: </p>
                <Input
                    className={"w-56 ml-2"}
                    onBlur={(e) => handleSaveProperty("price", parseFloat(e.target.value))}
                    defaultValue={stock.price}
                    size={"small"}
                    type={"number"}
                />
            </div>
            <div className={"flex mb-2"}>
                <p className={""}>State: </p>
                <Select className={"w-56 ml-2"}
                        defaultValue={stock.state}
                        onChange={(value) => {
                            handleSaveProperty("state", value)
                        }
                        }
                        size={"small"}
                >
                    {Object.values(StockManager.getStockStateMap()).map((state) =>
                        <Select.Option key={state}
                                       value={state}>{StockManager.getStockStateLabelMap(state)}</Select.Option>
                    )}
                </Select>
            </div>
            <div className={"flex mb-2"}>
                <p className={""}>Type: </p>
                <Select className={"w-56 ml-2"}
                        defaultValue={stock.type && StockManager.getStockTypeLabel(stock.type)}
                        onChange={(value) => handleSaveProperty("type", value)}
                        size={"small"}
                >
                    {Object.values(StockManager.getStockTypeList()).map((type) =>
                        <Select.Option key={type}
                                       value={type}>{StockManager.getStockTypeLabel(type)}</Select.Option>
                    )}
                </Select>
            </div>
            <div className={"flex mb-2"}>
                <p className={""}>Laptop: </p>
                <Select className={"w-56 ml-2"}
                        defaultValue={laptop?.name}
                        onChange={(value) => handleSaveProperty("laptopId", value)}
                        size={"small"}
                >
                    {laptopList.map((laptop) =>
                        <Select.Option key={laptop._id}
                                       value={laptop._id}>{laptop.name}</Select.Option>
                    )}
                </Select>
            </div>
        </Card>
    )
}