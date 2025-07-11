import { Alert, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import stockManager from "../../helpers/stock-manager.js";
import StockService from "../../api/services/stock-service.js";
import LaptopService from "../../api/services/laptop-service.js";

export default function BuyStockModal({ open, onClose, onReload, id, index, toBuyArray }) {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [form] = Form.useForm();

  const onCreate = async (values) => {
    if (values.price) {
      values.price = parseFloat(values.price);
    }
    const dtoIn = {
      name: toBuyArray[index],
      state: "booked",
      laptopId: id,
      ...values,
    };
    try {
      await StockService.create(dtoIn);
    } catch (e) {
      setShowErrorAlert(true);
      return;
    }

    toBuyArray.splice(index, 1);
    const removeToBuyDtoIn = {
      id,
      toBuy: toBuyArray,
    };
    try {
      await LaptopService.update(removeToBuyDtoIn);
      await onReload();
      onClose();
    } catch (e) {
      setShowErrorAlert(true);
    }
  };

  return (
    <Modal
      title={toBuyArray[index]}
      open={open}
      onCancel={onClose}
      okText="Create"
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
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      {showErrorAlert && (
        <>
          {" "}
          <Alert
            message="Failed to create laptop!"
            type="error"
            showIcon
            closable
            onClose={() => setShowErrorAlert(false)}
          />{" "}
          <br />{" "}
        </>
      )}
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            message: "Please input the price of stock!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[
          {
            required: true,
            message: "Please input the type of stock!",
          },
        ]}
      >
        <Select>
          {stockManager.getStockTypeList().map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Modal>
  );
}

BuyStockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  toBuyArray: PropTypes.array.isRequired,
};
