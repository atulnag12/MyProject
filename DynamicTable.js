// DynamicTable.js
import React, { useState } from 'react';
import './DynamicTable.css';

const DynamicTable = () => {
  const [tableData, setTableData] = useState([
    ['Row 1 Col 1', 'Row 1 Col 2'],
    ['Row 2 Col 1', 'Row 2 Col 2'],
  ]);

  const addRow = () => {
    const newRow = Array(tableData[0].length).fill('');
    setTableData([...tableData, newRow]);
  };

  const deleteRow = (index) => {
    const updatedTable = [...tableData];
    updatedTable.splice(index, 1);
    setTableData(updatedTable);
  };

  const addColumn = () => {
    const updatedTable = tableData.map((row) => [...row, '']);
    setTableData(updatedTable);
  };

  const deleteColumn = (index) => {
    const updatedTable = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(index, 1);
      return newRow;
    });
    setTableData(updatedTable);
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const updatedTable = [...tableData];
    updatedTable[rowIndex][colIndex] = value;
    setTableData(updatedTable);
  };

  return (
    <div className="dynamic-table-container">
      <button className="action-button" onClick={addRow}>
        Add Row
      </button>
      <button className="action-button" onClick={addColumn}>
        Add Column
      </button>
      <table className="dynamic-table" border="1">
        <thead>
          <tr>
            {Array(tableData[0].length)
              .fill('')
              .map((_, colIndex) => (
                <th key={colIndex}>
                  Column {colIndex + 1}{' '}
                  <button className="delete-button" onClick={() => deleteColumn(colIndex)}>
                    Delete Column
                  </button>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                  />
                  <button className="update-button" onClick={() => updateCell(rowIndex, colIndex, cell)}>
                    Update
                  </button>
                </td>
              ))}
              <td>
                <button className="delete-button" onClick={() => deleteRow(rowIndex)}>
                  Delete Row
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
