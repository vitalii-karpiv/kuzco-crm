import { Card, Input, Button } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomerService from "../../api/services/customer-service.js";

export default function CustomerDetailCard({ sale }) {
  const [customer, setCustomer] = useState(null);
  const [isEditingPib, setIsEditingPib] = useState(false);
  const [pibValue, setPibValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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
    setPibValue(customerDtoOut?.pib || "");
  }

  async function handleUpdatePib() {
    if (!customer || !pibValue.trim()) return;

    setIsUpdating(true);
    try {
      const updatedCustomer = await CustomerService.createOrUpdate({
        ...customer,
        pib: pibValue.trim(),
      });
      setCustomer(updatedCustomer);
      setIsEditingPib(false);
    } catch (error) {
      console.error("Failed to update customer PIB:", error);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleEditPib() {
    setPibValue(customer?.pib || "");
    setIsEditingPib(true);
  }

  function handleCancelEdit() {
    setPibValue(customer?.pib || "");
    setIsEditingPib(false);
  }

  return (
    <Card bordered={false} hoverable={true} className={"h-1/2"}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">ПІБ:</span>
          {isEditingPib ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={pibValue}
                onChange={(e) => setPibValue(e.target.value)}
                placeholder="Введіть ПІБ"
                disabled={isUpdating}
                className="flex-1"
              />
              <Button
                type="primary"
                icon={<SaveOutlined />}
                size="small"
                onClick={handleUpdatePib}
                loading={isUpdating}
                disabled={!pibValue.trim()}
              />
              <Button icon={<CloseOutlined />} size="small" onClick={handleCancelEdit} disabled={isUpdating} />
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <span>{customer?.pib || "-"}</span>
              {customer && <Button type="text" icon={<EditOutlined />} size="small" onClick={handleEditPib} />}
            </div>
          )}
        </div>
        <div>
          <span className="font-medium">Phone:</span> {customer?.phone || "-"}
        </div>
      </div>
    </Card>
  );
}

CustomerDetailCard.propTypes = {
  sale: PropTypes.object.isRequired,
};
