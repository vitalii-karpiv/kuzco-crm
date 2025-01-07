import {Table, Typography} from "antd";
import {useEffect, useState} from "react";
import DateView from "../date-view.jsx";
import InvestmentService from "../../api/services/investment-service.js";
import UserService from "../../api/services/user-service.js";

export default function InvestmentTable() {
    const [investments, setInvestments] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        loadInvestments();
    }, []);

    useEffect(() => {
        loadUsers();
    }, [investments]);

    async function loadInvestments() {
        const investmentsDtoOut = await InvestmentService.list({});
        setInvestments(investmentsDtoOut.itemList);
    }

    async function loadUsers() {
        const usersList = await UserService.list();
        setUsers(usersList);
    }

    const columns = [
        {
            title: 'User',
            dataIndex: 'userId',
            key: 'userId',
            render: (userId) => {
                if (!users) return <p>Loading...</p>;
                const user = users.find(user => user._id === userId);
                return <p>{user.name} {user.surname}</p>
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <DateView dateStr={date} showTime />
        }
    ];


    if (!investments) {
        return <div>Loading...</div>;
    }

    return <Table
        className={"m-3"}
        dataSource={investments}
        columns={columns}
        size={"small"}
        title={() => <Typography.Title level={4}>Investments</Typography.Title>}
    />
}

InvestmentTable.propTypes = {
}