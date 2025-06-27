import PropTypes from 'prop-types';
import {Card, Typography} from "antd";

export default function ToBuy({laptops}) {
    return (
        <Card className={"w-2/4"}>
            <Typography.Title level={4}>To buy</Typography.Title>
            {
                !laptops.length ?
                    <Typography.Text>Nothing to buy</Typography.Text>
                    :
                    laptops.map(laptop => {
                        return (
                            <div key={laptop.id}>
                                <Typography.Text><Typography.Text code>{laptop.code}</Typography.Text> {laptop.name}
                                </Typography.Text>
                                <ol key={laptop.id} className={"list-disc list-inside"}>
                                    {laptop.toBuy.map(toBuy => <li key={toBuy}>{toBuy}</li>)}
                                </ol>
                            </div>
                        )
                    })
            }
        </Card>
    )
}

ToBuy.propTypes = {
    laptops: PropTypes.array.isRequired,
}
