// import { LineOutlined, MenuOutlined } from "@ant-design/icons";
// import { Segmented, Select, Space } from "antd";
// import { useState } from "react";

// const AddAssetSetting = (props) => {
//   const cityData = {
//     Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
//     Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
//   };
//   const type = ["Supplier", "Warehouse", "Store"];
//   const [locationType, setLocationType] = useState([]);
//   const [secondCity, setSecondCity] = useState([]);

//   const handleProvinceChange = (value) => {
//     setCities(cityData[value]);
//     setSecondCity(cityData[value][0]);
//   };
//   const onSecondCityChange = (value) => {
//     setSecondCity(value);
//   };
//   return (
//     <div>
//       <h4>Select Asset Assignment Scope</h4>
//       <Segmented
//         options={[
//           {
//             label: "Company Wide",
//             value: "companyWide",
//             icon: <MenuOutlined />,
//           },
//           {
//             label: "Specific-Location",
//             value: "specificLocation",
//             icon: <LineOutlined />,
//           },
//         ]}
//         // onChange={setActiveComponent}
//       />
//       <Space wrap>
//         <Select
//           placeholder="Select location type"
//           onChange={handleProvinceChange}
//           options={locationType.map((type) => ({
//             label: type,
//             value: type,
//           }))}
//         />
//         <Select
//           placeholder="Select location name"
//           value={secondCity}
//           onChange={onSecondCityChange}
//           disabled={!cities.length}
//           options={cities.map((city) => ({
//             label: city,
//             value: city,
//           }))}
//         />
//       </Space>
//     </div>
//   );
// };

// export default AddAssetSetting;
