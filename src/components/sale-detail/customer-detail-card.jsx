import { Card } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomerService from "../../api/services/customer-service.js";

export default function CustomerDetailCard({ sale }) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    loadCustomer();
  }, [sale._id]);

  async function loadCustomer() {
    if (!sale.customerId) {
      setCustomer(null);
      return;
    }
    const customerDtoOut = await CustomerService.get(sale.customerId);
    setCustomer(customerDtoOut);
  }

  return (
    <Card bordered={false} hoverable={true} className={"h-1/2"}>
      ПІБ: {customer?.pib || "-"} <br />
      Phone: {customer?.phone || "-"}
    </Card>
  );
}

CustomerDetailCard.propTypes = {
  sale: PropTypes.object.isRequired,
};
