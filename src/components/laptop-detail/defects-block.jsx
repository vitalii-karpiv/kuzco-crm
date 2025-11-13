import { Button, Card, Input, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import LaptopService from "../../api/services/laptop-service.js";

export default function DefectsBlock({ laptop, setLaptop }) {
  async function handleSaveDefect(index, value) {
    const newDefects = [...laptop.defects];
    newDefects[index] = value;
    await LaptopService.update({ id: laptop._id, defects: newDefects });
    setLaptop({ ...laptop, defects: newDefects });
  }

  return (
    <Card bordered={false} hoverable={true} className={"w-2/4"}>
      <div className={"flex justify-between align-middle"}>
        <Typography.Title level={4}>Defects</Typography.Title>
        <Button size={"small"} onClick={() => setLaptop({ ...laptop, defects: [...laptop.defects, ""] })}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      {laptop?.defects && (
        <ul className={"list-disc mb-4 ml-3 overflow-y-auto max-h-[258px]"}>
          {laptop.defects.map((defect, index) => {
            return (
              <li key={defect} className={"my-1"}>
                <Input
                  defaultValue={defect}
                  onPressEnter={(e) => handleSaveDefect(index, e.target.value)}
                  onBlur={(e) => handleSaveDefect(index, e.target.value)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

DefectsBlock.propTypes = {
  laptop: PropTypes.object.isRequired,
  setLaptop: PropTypes.func.isRequired,
};
