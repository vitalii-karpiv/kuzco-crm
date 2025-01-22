import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../components/loading.jsx";
import LaptopService from "../api/services/laptop-service.js";
import {Button, Card, Image, Select, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import UpdateCharacteristicsModal from "../components/laptop-detail/update-characteristics-modal.jsx";
import BuyStockModal from "../components/laptop-detail/buy-stock-modal.jsx";
import StockService from "../api/services/stock-service.js";
import LaptopManager from "../helpers/laptop-manager.js";
import SaleService from "../api/services/sale-service.js";
import ImageService from "../api/services/image-service.js";
import {API_URL} from "../api/http/index.js";
import CharacteristicsBlock from "../components/laptop-detail/characteristics-block.jsx";
import ToBuyBlock from "../components/laptop-detail/to-buy-block.jsx";
import ComplectationBlock from "../components/laptop-detail/complectation-block.jsx";
import FinanceBlock from "../components/laptop-detail/finance-block.jsx";
import MarketplaceBlock from "../components/laptop-detail/marketplace-block.jsx";
import DefectsBlock from "../components/laptop-detail/defects-block.jsx";
import TechCheckBlock from "../components/laptop-detail/tech-check-block.jsx";
import LaptopStateTag from "../components/common/laptop-state-tag.jsx";

export default function LaptopDetail() {
    let {id} = useParams();
    const navigate = useNavigate();
    const [laptop, setLaptop] = useState();
    const [imageList, setImageList] = useState();
    const [defectList, setDefectList] = useState();
    const [stockList, setStockList] = useState();
    const [showUpdateCharacteristics, setShowUpdateCharacteristics] = useState(false);
    const [stockOpt, setStockOpt] = useState({show: false, index: null});

    useEffect(() => {
        loadLaptop();
        loadStock();
    }, [id]);

    useEffect(() => {
        loadImages();
        loadDefects();
    }, [laptop?._id])

    const loadLaptop = async () => {
        const laptop = await LaptopService.get(id);
        setLaptop(laptop);
    }

    const loadImages = async () => {
        const idList = await ImageService.list({laptopId: id, isDefect: false});
        const loadedImages = [];
        for (let imgId of idList) {
            const img = await ImageService.get(imgId);
            const objectURL = URL.createObjectURL(img);
            loadedImages.push(objectURL)
        }
        setImageList(loadedImages);
    }

    const loadDefects = async () => {
        const idList = await ImageService.list({laptopId: id, isDefect: true});
        const loadedImages = [];
        for (let imgId of idList) {
            const img = await ImageService.get(imgId);
            const objectURL = URL.createObjectURL(img);
            loadedImages.push(objectURL)
        }
        setDefectList(loadedImages);
    }

    const handleSetState = async (state) => {
        const updated = await LaptopService.setState({id, state});
        setLaptop(updated);
    }

    const handleImageChange = (info) => {
        if (info.fileList.every(file => file.status === "done")) {
            loadImages()
        }
    };

    const handleDefectChange = (info) => {
        if (info.fileList.every(file => file.status === "done")) {
            loadDefects()
        }
    };

    const loadStock = async () => {
        const stockListDto = await StockService.list({laptopId: id});
        setStockList(stockListDto.itemList);
    }

    const onBuyStockReload = async () => {
        await loadStock();
        await loadLaptop();
    }

    const handleLaptopSold = async () => {
        // update laptop state
        try {
            await LaptopService.update({id, state: LaptopManager.getLaptopStateMap().WAITING_FOR_DELIVERY});
        } catch (e) {
            console.log("TODO: handle error", e)
        }
        // create new sale
        let sale;
        try {
            sale = await SaleService.create({laptopId: id, price: laptop?.sellPrice});
        } catch (e) {
            console.log("TODO: handle error", e)
        }
        navigate(`/sales/saleDetail/${sale._id}`)
    }

    if (!laptop) {
        return <Loading/>
    }

    return <div className={"block w-full mx-5"}>
        <header className={"flex justify-between items-center"}>
            <Typography.Title level={3}>{laptop.name}</Typography.Title>
            <div className={"flex justify-between items-center"}>
                <Select
                    defaultValue={laptop.state}
                    variant={"borderless"}
                    placement={"bottomRight"}
                    suffixIcon={null}
                    popupClassName={"min-w-44"}
                    onChange={(state) => handleSetState(state)}
                >
                    {LaptopManager.getLaptopStateList().map(state => <Select.Option key={state} value={state}><LaptopStateTag state={state} /></Select.Option>)}
                </Select>
                <Button onClick={handleLaptopSold}
                        className={"bg-green-100"}
                        size={"small"}
                        disabled={LaptopManager.getFinalStates().includes(laptop.state)}>Продано!</Button>
            </div>
        </header>
        <div className={"flex mb-3"}>
            <CharacteristicsBlock laptop={laptop}/>
            <ToBuyBlock laptop={laptop} setStockOpt={setStockOpt} setLaptop={setLaptop}/>
        </div>
        <div className={"flex mb-3"}>
            <ComplectationBlock stockList={stockList} setStockList={setStockList} laptopId={laptop?._id}/>
            <MarketplaceBlock laptop={laptop} setLaptop={setLaptop}/>
        </div>
        <div className={"flex mb-3"}>
            <FinanceBlock laptop={laptop} setLaptop={setLaptop} />
            <TechCheckBlock laptop={laptop} setLaptop={setLaptop} />
        </div>
        <div className={"flex mb-3"}>
            <Card bordered={false} hoverable={true} className={"w-2/4 mr-3"}>
                <Typography.Title level={4}>Photos</Typography.Title>
                <div>
                    <div className={"mb-2"}>
                        {imageList && <Image.PreviewGroup>
                            {imageList.map((item) => (
                                <div className={"m-1 p-1 inline"} key={item}>
                                    <Image key={item} src={item} width={80} height={80} className={"block rounded-xl"}/>
                                </div>
                            ))}
                        </Image.PreviewGroup>
                        }
                    </div>

                    <Upload
                        name="image"
                        action={`${API_URL}/image/upload`}
                        data={{laptopId: id}}
                        multiple={true}
                        onChange={handleImageChange}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                </div>
            </Card>
            <DefectsBlock laptop={laptop} setLaptop={setLaptop} handleDefectChange={handleDefectChange} defectImageList={defectList} />
        </div>
        {/*  MODALS  */}
        {showUpdateCharacteristics && <UpdateCharacteristicsModal open={showUpdateCharacteristics}
                                                                  onClose={() => setShowUpdateCharacteristics(false)}
                                                                  onReload={loadLaptop} id={id}/>}
        {stockOpt.show &&
            <BuyStockModal
                open={stockOpt.show}
                onClose={() => setStockOpt({show: false, index: null})}
                onReload={onBuyStockReload}
                id={id}
                index={stockOpt.index}
                toBuyArray={laptop.toBuy}/>}
    </div>
}