import { Alert, Form, Input, Modal } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import LaptopService from "../../api/services/laptop-service.js";

export default function UpdateCharacteristicModal({ open, onClose, onReload, id }) {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [form] = Form.useForm();

  const onUpdate = async (values) => {
    if (values.ports) {
      values.ports = values.ports.split(", ");
    }
    try {
      await LaptopService.update({ characteristics: values, id });
      await onReload();
      onClose();
    } catch (e) {
      setShowErrorAlert(true);
    }
  };

  return (
    <Modal
      title="Create laptop"
      open={open}
      onCancel={onClose}
      okText="Update"
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
          onFinish={(values) => onUpdate(values)}
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
        name="processor"
        label="Processor"
        rules={[
          {
            required: true,
            message: "Please input the processor of laptop!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="videocard"
        label="Video card"
        rules={[
          {
            required: true,
            message: "Please input the video card of laptop!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ssd"
        label="SSD"
        rules={[
          {
            required: true,
            message: "Please input the SSD of laptop!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ram"
        label="RAM"
        rules={[
          {
            required: true,
            message: "Please input the RAM of laptop!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="screen"
        label="SCREEN"
        rules={[
          {
            required: true,
            message: "Please input the SCREEN of laptop!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ports"
        label="PORTS"
        rules={[
          {
            required: true,
            message: "Please input the PORTS of laptop!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="note" label="Note">
        <Input />
      </Form.Item>
    </Modal>
  );
}

UpdateCharacteristicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
