// DataTable.js

import React, { useState } from 'react';
import './DataTable.css';

const DataTable = () => {
  const [tableData, setTableData] = useState([
    // Initial data with an example row
    { InstanceNumber: 1, BrokerName: 'Broker 1', BrokerDescription: 'Description 1', HostName: 'Host 1', HostDescription: 'Host Description 1' },
  ]);

  const [columnNames, setColumnNames] = useState(Object.keys(tableData[0]));
  const [formData, setFormData] = useState(Object.fromEntries(columnNames.map((columnName) => [columnName, ''])));
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleAddRow = () => {
    if (selectedRowIndex !== null) {
      // If a row is selected, update the row
      const updatedData = [...tableData];
      updatedData[selectedRowIndex] = formData;
      setTableData(updatedData);
      setFormData(Object.fromEntries(columnNames.map((columnName) => [columnName, ''])));
      setSelectedRowIndex(null); // Clear selected row after update
    } else {
      // If no row is selected, add a new row
      setTableData([...tableData, formData]);
      setFormData(Object.fromEntries(columnNames.map((columnName) => [columnName, ''])));
    }
  };

  const handleUpdateRow = (index, updatedRow) => {
    // Set the selected row for update
    setFormData(updatedRow);
    setSelectedRowIndex(index);
  };

  const handleDeleteRow = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    setFormData(Object.fromEntries(columnNames.map((columnName) => [columnName, ''])));
    setSelectedRowIndex(null); // Clear selected row after delete
  };

  const handleAddColumn = () => {
    const newColumnName = prompt('Enter new column name');
    if (newColumnName && !columnNames.includes(newColumnName)) {
      setColumnNames([...columnNames, newColumnName]);
      setTableData((prevData) =>
        prevData.map((row) => ({
          ...row,
          [newColumnName]: '',
        }))
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        [newColumnName]: '',
      }));
    }
  };

  const handleDeleteColumn = (columnName) => {
    if (columnNames.length > 1) {
      const updatedColumnNames = columnNames.filter((name) => name !== columnName);
      setColumnNames(updatedColumnNames);
      setTableData((prevData) => {
        const updatedData = prevData.map((row) => {
          const { [columnName]: deletedColumn, ...rest } = row;
          return rest;
        });
        return updatedData;
      });
      setFormData((prevFormData) => {
        const { [columnName]: deletedColumn, ...rest } = prevFormData;
        return rest;
      });
    } else {
      alert('Cannot delete the last column.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSort = () => {
    const sortedData = [...tableData].sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return order * (a.InstanceNumber - b.InstanceNumber);
    });

    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="data-table-container">
      <div className="table-title">Broker GUI Application</div>
      <table className="data-table">
        <thead>
          <tr>
            {columnNames.map((columnName) => (
              <th key={columnName}>
                {columnName}
                <button onClick={() => handleDeleteColumn(columnName)}>D</button>
              </th>
            ))}
            <th>
              Actions
              <button onClick={handleSort}>S</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((columnName) => (
                <td key={columnName}>
                  <input
                    type="text"
                    name={columnName}
                    value={row[columnName]}
                    onChange={(e) => {
                      const updatedRow = { ...row, [columnName]: e.target.value };
                      handleUpdateRow(rowIndex, updatedRow);
                    }}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => handleUpdateRow(rowIndex, row)}>U</button>
                <button onClick={() => handleDeleteRow(rowIndex)}>D</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="add-row-form" onSubmit={(e) => { e.preventDefault(); handleAddRow(); }}>
        {columnNames.map((columnName) => (
          <div key={columnName} className="form-input">
            <label>{columnName}:</label>
            <input
              type="text"
              name={columnName}
              value={formData[columnName]}
              onChange={handleFormChange}
            />
          </div>
        ))}
        <button type="submit">Add Row</button>
      </form>
      <div className="add-column-container">
        <button onClick={handleAddColumn}>Add Column</button>
      </div>
    </div>
  );
};

export default DataTable;
