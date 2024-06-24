import React from "react";
import { useTable } from "react-table";

const TravelPage = () => {
  const data = React.useMemo(
    () => [
      {
        vehicle_brand: "Toyota",
        vehicle_model: "Camry",
        driver: "John Doe",
        IMEI: "123456789012345",
        start_location: "New York",
      },
      // Add more data as needed
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        accessor: "vehicle_brand",
        Header: "Vehicle Brand",
        id: "vehicle_brand_1",
      },
      {
        accessor: "vehicle_model",
        Header: "Vehicle Model",
      },
      {
        accessor: "vehicle_brand",
        Header: "Vehicle Brand",
        id: "vehicle_brand_2",
      },
      {
        accessor: "driver",
        Header: "Driver",
      },
      {
        accessor: "IMEI",
        Header: "Driver",
        id: "IMEI_1",
      },
      {
        accessor: "start_location",
        Header: "Driver",
      },
      {
        accessor: "IMEI",
        Header: "Driver",
        id: "IMEI_2",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TravelPage;
