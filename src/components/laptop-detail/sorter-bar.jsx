import { Button, Card, Typography } from "antd";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function SorterBar({ sorters, setSorters }) {
  return (
    <Card bordered={true} className={"ml-3"}>
      <Typography.Title level={5}>Sorter bar</Typography.Title>
      <div>
        <Button onClick={() => updateSorter(sorters, "sellPrice", setSorters)} icon={getIcon(sorters.sellPrice)}>
          Продажна ціна
        </Button>
        <Button onClick={() => updateSorter(sorters, "limitPrice", setSorters)} icon={getIcon(sorters.limitPrice)}>
          Лімітована ціна
        </Button>
      </div>
    </Card>
  );
}

function updateSorter(sorters, key, setSorters) {
  if (sorters[key] === "asc") {
    setSorters({ ...sorters, [key]: "desc" });
  } else if (sorters[key] === "desc") {
    delete sorters[key];
    setSorters({ ...sorters });
  } else {
    sorters[key] = "asc";
    setSorters({ ...sorters, [key]: "asc" });
  }
}

function getIcon(sorter) {
  if (sorter === "asc") {
    return <FontAwesomeIcon icon={faSortUp} />;
  } else if (sorter === "desc") {
    return <FontAwesomeIcon icon={faSortDown} />;
  } else {
    return <FontAwesomeIcon icon={faSort} />;
  }
}

SorterBar.propTypes = {
  sorters: PropTypes.object.isRequired,
  setSorters: PropTypes.func.isRequired,
};
