import { Card, Checkbox, Collapse, Typography } from "antd";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea.js";
import LaptopService from "../../api/services/laptop-service.js";

export default function MarketplaceBlock({ laptop = {}, setLaptop }) {
  async function handleUpdateMarketplace(name, published, description) {
    const updatedMarketplaces = laptop.marketplaces.map((marketplace) => {
      if (marketplace.name === name) {
        marketplace.published = published;
        marketplace.description = description;
      }
      return marketplace;
    });
    const updated = await LaptopService.update({ id: laptop._id, marketplaces: updatedMarketplaces });
    setLaptop(updated);
  }

  const marketDescriptionList = laptop.marketplaces.map((marketplace, index) => {
    let classNames = "rounded mb-2 text-white";
    if (marketplace.published) classNames += " bg-teal-400";
    else classNames += " bg-rose-400";
    return {
      key: index + 1,
      label: (
        <div>
          <Typography.Text className={"mr-2 text-white font-bold"}>{marketplace.name}</Typography.Text>
          <Checkbox
            defaultChecked={marketplace.published}
            onClick={(e) => {
              handleUpdateMarketplace(marketplace.name, e.target.checked, marketplace.description);
            }}
          />
        </div>
      ),
      children: (
        <TextArea
          rows={12}
          textArea
          onBlur={(e) => handleUpdateMarketplace(marketplace.name, marketplace.published, e.target.value)}
          defaultValue={marketplace.description}
          size={"small"}
        />
      ),
      className: classNames,
    };
  });

  return (
    <Card bordered={false} hoverable={true} className={"w-2/4"}>
      <Typography.Title level={4}>Marketplaces</Typography.Title>
      <Collapse items={marketDescriptionList} bordered={true} collapsible={"icon"} ghost={true} />
    </Card>
  );
}

MarketplaceBlock.propTypes = {
  laptop: PropTypes.object.isRequired,
  setLaptop: PropTypes.func.isRequired,
};
