import { Card, Typography, message, Button, Input } from "antd";
import { useEffect, useState } from "react";
import LaptopService from "../../api/services/laptop-service.js";
import LaptopManager from "../../helpers/laptop-manager.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import BuyStockModal from "../laptop-detail/buy-stock-modal.jsx";
import { Link } from "react-router-dom";

export default function ToBuy() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({}); // {laptopId: {index: newName}}
  const [adding, setAdding] = useState({}); // {laptopId: newItem}
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLaptop, setModalLaptop] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);

  async function fetchLaptops() {
    setLoading(true);
    try {
      const listDtoOut = await LaptopService.list({ state: LaptopManager.getActiveStates(), toBuy: true });
      setLaptops(listDtoOut.itemList);
    } catch (e) {
      message.error("Failed to fetch laptops to buy");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLaptops();
  }, []);

  // Edit toBuy item name
  async function handleEditToBuy(laptop, idx) {
    const newName = editing[laptop._id]?.[idx];
    if (!newName || newName === laptop.toBuy[idx]) {
      setEditing((prev) => ({ ...prev, [laptop._id]: { ...prev[laptop._id], [idx]: undefined } }));
      return;
    }
    const newToBuy = [...laptop.toBuy];
    newToBuy[idx] = newName;
    try {
      await LaptopService.update({ id: laptop._id, toBuy: newToBuy });
      setEditing((prev) => ({ ...prev, [laptop._id]: { ...prev[laptop._id], [idx]: undefined } }));
      await fetchLaptops();
    } catch (e) {
      message.error("Failed to update item");
    }
  }

  // Mark as bought (open modal)
  function handleBought(laptop, idx) {
    setModalLaptop(laptop);
    setModalIndex(idx);
    setModalOpen(true);
  }

  // Add new toBuy item
  async function handleAddToBuy(laptop) {
    const newItem = adding[laptop._id];
    if (!newItem) return;
    try {
      await LaptopService.update({ id: laptop._id, toBuy: [...laptop.toBuy, newItem] });
      message.success("Item added");
      fetchLaptops();
    } catch (e) {
      message.error("Failed to add item");
    }
    setAdding((prev) => ({ ...prev, [laptop._id]: "" }));
  }

  // Remove toBuy item
  async function handleRemoveToBuy(laptop, idx) {
    const newToBuy = laptop.toBuy.filter((_, i) => i !== idx);
    try {
      await LaptopService.update({ id: laptop._id, toBuy: newToBuy });
      message.success("Item removed");
      fetchLaptops();
    } catch (e) {
      message.error("Failed to remove item");
    }
  }

  return (
    <Card className={"w-2/4 ml-2"} loading={loading}>
      <Typography.Title level={4}>To buy</Typography.Title>
      {!laptops.length ? (
        <Typography.Text>Nothing to buy</Typography.Text>
      ) : (
        <ul className={"list-disc list-inside space-y-2 overflow-y-auto max-h-[310px]"}>
          {laptops.map((laptop) => (
            <li key={laptop.id}>
              <Link to={`/laptops/laptopDetail/${laptop._id}`}>
                <Typography.Text>
                  <Typography.Text code>{laptop.code}</Typography.Text> {laptop.name}
                </Typography.Text>
              </Link>
              <ul className={"list-decimal list-inside space-y-2 ml-8 mt-2"}>
                {laptop.toBuy.map((toBuy, idx) => (
                  <li key={toBuy + idx} className="flex items-center bg-rose-100 w-auto px-1 py-0.5 rounded">
                    {editing[laptop._id]?.[idx] !== undefined ? (
                      <>
                        <Input
                          size="small"
                          value={editing[laptop._id][idx]}
                          onChange={(e) =>
                            setEditing((prev) => ({
                              ...prev,
                              [laptop._id]: { ...(prev[laptop._id] || {}), [idx]: e.target.value },
                            }))
                          }
                          onBlur={() => handleEditToBuy(laptop, idx)}
                          onPressEnter={() => handleEditToBuy(laptop, idx)}
                          className="mr-2 w-40"
                        />
                        <Button
                          size="small"
                          icon={<FontAwesomeIcon icon={faXmark} />}
                          onClick={() =>
                            setEditing((prev) => ({
                              ...prev,
                              [laptop._id]: { ...(prev[laptop._id] || {}), [idx]: undefined },
                            }))
                          }
                          className="mr-1"
                        >
                          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                            Cancel
                          </Typography.Text>
                        </Button>
                        <Button size="small" onClick={() => handleEditToBuy(laptop, idx)} className="mr-1">
                          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                            Save
                          </Typography.Text>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography.Text className="mr-2">{toBuy}</Typography.Text>
                        <Button
                          size="small"
                          icon={<FontAwesomeIcon icon={faPen} />}
                          className="mr-1"
                          onClick={() =>
                            setEditing((prev) => ({
                              ...prev,
                              [laptop._id]: { ...(prev[laptop._id] || {}), [idx]: toBuy },
                            }))
                          }
                        >
                          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                            Edit
                          </Typography.Text>
                        </Button>
                      </>
                    )}
                    <Button
                      size="small"
                      icon={<FontAwesomeIcon icon={faCheck} />}
                      className="mr-1"
                      onClick={() => handleBought(laptop, idx)}
                    >
                      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                        Bought
                      </Typography.Text>
                    </Button>
                    <Button
                      size="small"
                      icon={<FontAwesomeIcon icon={faXmark} />}
                      danger
                      onClick={() => handleRemoveToBuy(laptop, idx)}
                    >
                      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                        Remove
                      </Typography.Text>
                    </Button>
                  </li>
                ))}
                <li className="flex items-center mt-2">
                  <Input
                    size="small"
                    placeholder="Add new item"
                    value={adding[laptop._id] || ""}
                    onChange={(e) => setAdding((prev) => ({ ...prev, [laptop._id]: e.target.value }))}
                    onPressEnter={() => handleAddToBuy(laptop)}
                    className="mr-2 w-40"
                  />
                  <Button size="small" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => handleAddToBuy(laptop)}>
                    <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                      Add
                    </Typography.Text>
                  </Button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {modalOpen && modalLaptop && (
        <BuyStockModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onReload={() => {
            setModalOpen(false);
            fetchLaptops();
          }}
          id={modalLaptop._id}
          index={modalIndex}
          toBuyArray={modalLaptop.toBuy}
        />
      )}
    </Card>
  );
}
