import {Button} from "antd";

export default function LaptopsTableHeader({onClick}) {
    return (
        <div className={"flex justify-between pl-2 pr-2"}>
            <h3 className={"font-bold text-2xl align-middle"}>Laptops</h3>
            <Button type={"primary"} onClick={onClick}>+ Add laptop</Button>
        </div>
    )
}