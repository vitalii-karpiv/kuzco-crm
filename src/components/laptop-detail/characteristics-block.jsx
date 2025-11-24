import { Button, Card, Checkbox, Input, message, Select, Typography } from "antd";
import PropTypes from "prop-types";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import LaptopService from "../../api/services/laptop-service.js";
import LaptopManager from "../../helpers/laptop-manager.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CharacteristicsBlock({ laptop = {}, setLaptop }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdate() {
    let updated;
    try {
      updated = await LaptopService.update({
        id: laptop._id,
        imageUrl: laptop.imageUrl,
        serviceTag: laptop.serviceTag,
        note: laptop.note,
        characteristics: { ...laptop.characteristics },
      });
      setLaptop(updated);
    } catch (e) {
      messageApi.open({
        duration: 3,
        type: "error",
        content: "Laptop update failed. Please refresh the page.",
      });
      console.log(e);
    }
    setIsEditing(false);
  }

  return (
    <Card bordered={false} hoverable={true} className={"w-2/4 mr-3"} loading={false}>
      {contextHolder}
      <div className={"flex justify-between"}>
        <Typography.Title level={4}>Characteristics</Typography.Title>
        <Button
          size={"small"}
          icon={<FontAwesomeIcon icon={faSquarePen} />}
          onClick={() => {
            isEditing ? handleUpdate() : setIsEditing(true);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      <div className={""}>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🏷️ Service Tag: </p>
          {isEditing ? (
            <Input
              className={"w-2/3"}
              onChange={(e) => (laptop.serviceTag = e.target.value)}
              defaultValue={laptop.serviceTag}
              size={"small"}
            />
          ) : (
            <p>{laptop.serviceTag}</p>
          )}
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>⚙️ Processor: </p>
          {isEditing ? (
            <Input
              className={"w-2/3"}
              onChange={(e) => (laptop.characteristics.processor = e.target.value)}
              defaultValue={laptop.characteristics?.processor}
              size={"small"}
            />
          ) : (
            <p>{laptop.characteristics?.processor}</p>
          )}
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🚀 Videocard: </p>
          <div className={"flex flex-col w-2/3 "}>
            {isEditing ? (
              <Input
                className={"w-full block"}
                onChange={(e) => (laptop.characteristics.videocard = e.target.value)}
                defaultValue={laptop.characteristics?.videocard}
                size={"small"}
              />
            ) : (
              <p>{laptop.characteristics?.videocard}</p>
            )}

            <Checkbox
              className={""}
              defaultChecked={laptop.characteristics?.discrete}
              disabled={!isEditing}
              onChange={(e) => (laptop.characteristics.discrete = e.target.checked)}
            >
              Discrete
            </Checkbox>
            <Checkbox
              className={""}
              defaultChecked={laptop.characteristics?.keyLight}
              disabled={!isEditing}
              onChange={(e) => (laptop.characteristics.keyLight = e.target.checked)}
            >
              Підсвітка клави
            </Checkbox>
          </div>
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>💾 SSD: </p>
          {isEditing ? (
            <Input
              className={"w-2/3"}
              type={"number"}
              onChange={(e) => (laptop.characteristics.ssd = parseFloat(e.target.value))}
              defaultValue={laptop.characteristics?.ssd}
              size={"small"}
            />
          ) : (
            <p>{laptop.characteristics?.ssd} GB</p>
          )}
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>💿 RAM: </p>
          {isEditing ? (
            <Input
              className={"w-2/3"}
              type={"number"}
              onChange={(e) => (laptop.characteristics.ram = parseFloat(e.target.value))}
              defaultValue={laptop.characteristics?.ram}
              size={"small"}
            />
          ) : (
            <p>{laptop.characteristics?.ram} GB</p>
          )}
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🔋 Battery (знос): </p>
          {isEditing ? (
            <Input
              type={"number"}
              className={"w-2/3"}
              onChange={(e) => (laptop.characteristics.battery = parseInt(e.target.value))}
              defaultValue={laptop.characteristics?.battery}
              size={"small"}
            />
          ) : (
            <p>{laptop.characteristics?.battery} %</p>
          )}
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🖥️ Screen size: </p>
          <div className={"flex flex-col w-2/3 "}>
            {isEditing ? (
              <Input
                className={"w-full"}
                onChange={(e) => (laptop.characteristics.screenSize = parseFloat(e.target.value))}
                defaultValue={laptop.characteristics?.screenSize}
                size={"small"}
              />
            ) : (
              <p>{laptop.characteristics?.screenSize} '</p>
            )}

            <Checkbox
              className={""}
              defaultChecked={laptop.characteristics?.touch}
              disabled={!isEditing}
              onChange={(e) => (laptop.characteristics.touch = e.target.checked)}
            >
              Touch
            </Checkbox>
          </div>
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🖥️ Resolution: </p>
          <Select
            disabled={!isEditing}
            defaultValue={laptop.characteristics?.resolution}
            onChange={(value) => (laptop.characteristics.resolution = value)}
            options={LaptopManager.getResolutionListOptions()}
            className={"w-2/3"}
            size={"small"}
          />
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🖥️ Panel Type: </p>
          <Select
            disabled={!isEditing}
            defaultValue={laptop.characteristics?.panelType}
            onChange={(value) => (laptop.characteristics.panelType = value)}
            options={LaptopManager.getPanelTypeListOptions()}
            className={"w-2/3"}
            size={"small"}
          />
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🖥️ Refresh rate: </p>
          <Select
            disabled={!isEditing}
            defaultValue={laptop.characteristics?.refreshRate}
            onChange={(value) => (laptop.characteristics.refreshRate = value)}
            options={LaptopManager.getRefreshRateListOptions()}
            className={"w-2/3"}
            size={"small"}
          />
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🔌 Ports: </p>
          <Select
            mode="multiple"
            disabled={!isEditing}
            defaultValue={laptop.characteristics?.ports}
            onChange={(value) => (laptop.characteristics.ports = value)}
            options={LaptopManager.getPortsListOptions()}
            className={"w-2/3"}
            size={"small"}
          />
        </div>
        <div className={"flex mb-2"}>
          <p className={"w-1/4"}>🗒️ Note: </p>
          {isEditing ? (
            <Input.TextArea
              rows={4}
              textArea
              className={"w-2/3"}
              onChange={(e) => (laptop.note = e.target.value)}
              defaultValue={laptop.note}
              size={"small"}
            />
          ) : (
            <p>{laptop.note}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

CharacteristicsBlock.propTypes = {
  laptop: PropTypes.object.isRequired,
  setLaptop: PropTypes.func.isRequired,
};
