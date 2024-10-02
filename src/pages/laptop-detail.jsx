import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../components/loading.jsx";
import LaptopService from "../api/services/laptop-service.js";

export default function LaptopDetail() {
    let {id} = useParams();

    const [laptop, setLaptop] = useState();

    useEffect(() => {
        async function loadLaptop() {
            const laptop = await LaptopService.get(id);
            setLaptop(laptop);
        }

        loadLaptop();
    }, [id]);

    if (!laptop) {
        return <Loading/>
    }

    return <div className={"block w-full mx-5"}>
        <header>
            <h1 className={"text-xl mb-3"}>{laptop.brand}</h1>
        </header>
    </div>
}