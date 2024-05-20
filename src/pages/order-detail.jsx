import {useParams} from "react-router-dom";

export default function OrderDetail()  {
    let {id} = useParams();

    return <h1>Order Detail {id}</h1>;
}