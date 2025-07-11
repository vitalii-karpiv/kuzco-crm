import { Form, Modal, Select, Typography } from "antd";
import PropTypes from "prop-types";
import stockManager from "../../helpers/stock-manager.js";
import StockService from "../../api/services/stock-service.js";
import { useEffect, useState } from "react";

const { Text } = Typography;

export default function AddStockModal({ open, onClose, type, laptopId, stockList, setStockList }) {
  const [form] = Form.useForm();
  const [availableStocks, setAvailableStocks] = useState([]);

  useEffect(() => {
    loadAvailableStocks();
  }, []);

  async function handleAdd(values) {
    const newStock = await StockService.update({ ...values, laptopId, state: stockManager.getStockStateMap().BOOKED });
    setStockList([...stockList, newStock]);
    onClose();
  }

  async function loadAvailableStocks() {
    const stocks = await StockService.list({ type, state: stockManager.getStockStateMap().FREE });
    setAvailableStocks(stocks.itemList);
  }

  return (
    <Modal
      title={"Add stock item"}
      open={open}
      onCancel={onClose}
      okText="Add"
      cancelText="Cancel"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          clearOnDestroy
          onFinish={(values) => handleAdd(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="id"
        label="Stock"
        rules={[
          {
            required: true,
            message: "Please input the stock!",
          },
        ]}
      >
        <Select>
          {availableStocks.map((stock) => (
            <Select.Option key={stock._id} value={stock._id}>
              <Text code>{stock.code}</Text>
              <Text strong className={"mx-2"}>
                {stock.name}
              </Text>
              <Text code type="success">
                {stock.price} грн
              </Text>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Modal>
  );
}

AddStockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  laptopId: PropTypes.string.isRequired,
  stockList: PropTypes.array.isRequired,
  setStockList: PropTypes.func.isRequired,
};
