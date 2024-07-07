import { Table } from "antd";

const SecondaryTable = ({ receiverProcessDetail, receiver }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "assetID",
      key: "id",
      width: "8%",
    },
    {
      title: "Asset Name",
      dataIndex: "assetName",
      key: "name",
      width: "25%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "15%",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
  ];

  return (
    receiverProcessDetail &&
    receiver && (
      <Table
        columns={columns}
        dataSource={receiverProcessDetail.assetShipment}
        pagination={false}
        scroll={{ y: 200 }}
      />
    )
  );
};
export default SecondaryTable;
