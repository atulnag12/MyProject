import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [columns, setColumns] = useState(['ID', 'Name', 'Age']);
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Bob Smith', age: 28 },
  ]);

  const [newRow, setNewRow] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.toLowerCase()]: '' }), {})
  );

  const [updatedData, setUpdatedData] = useState({});
  const [editableRow, setEditableRow] = useState(null);

  const [newColumnName, setNewColumnName] = useState('');
  const [filters, setFilters] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.toLowerCase()]: '' }), {})
  );

  const handleAddRow = () => {
    setData([...data, { id: data.length + 1, ...newRow }]);
    setNewRow(
      columns.reduce((acc, column) => ({ ...acc, [column.toLowerCase()]: '' }), {})
    );
  };

  const handleUpdateRow = (id) => {
    setEditableRow(id);
    setUpdatedData({ ...data.find((row) => row.id === id) });
  };

  const handleUpdateCell = (id) => {
    const updatedRows = data.map((row) =>
      row.id === id ? { ...row, ...updatedData } : row
    );
    setData(updatedRows);
    setEditableRow(null);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = data.filter((row) => row.id !== id);
    setData(updatedRows);
    setEditableRow(null);
  };

  const handleAddColumn = () => {
    if (newColumnName && !columns.includes(newColumnName)) {
      setColumns([...columns, newColumnName]);
      setNewRow({
        ...newRow,
        [newColumnName.toLowerCase()]: '',
      });
      setUpdatedData({
        ...updatedData,
        [newColumnName.toLowerCase()]: '',
      });
      setNewColumnName('');
      setFilters({
        ...filters,
        [newColumnName.toLowerCase()]: '',
      });
    }
  };

  const handleFilterChange = (column, value) => {
    setFilters({
      ...filters,
      [column.toLowerCase()]: value,
    });
  };

  const filterData = () => {
    let filteredData = data;

    columns.forEach((column) => {
      const filterValue = filters[column.toLowerCase()].toLowerCase();
      if (filterValue) {
        filteredData = filteredData.filter((row) =>
          row[column.toLowerCase()].toString().toLowerCase().includes(filterValue)
        );
      }
    });

    return filteredData;
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                <input
                  type="text"
                  placeholder={`Search ${column}`}
                  value={filters[column.toLowerCase()] || ''}
                  onChange={(e) => handleFilterChange(column, e.target.value)}
                />
                {column}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterData().map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column}>
                  {editableRow === row.id ? (
                    <input
                      className="editable-input"
                      type="text"
                      value={updatedData[column.toLowerCase()] || ''}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          [column.toLowerCase()]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    row[column.toLowerCase()]
                  )}
                </td>
              ))}
              <td>
                {editableRow === row.id ? (
                  <button
                    className="update-button"
                    onClick={() => handleUpdateCell(row.id)}
                  >
                    Update
                  </button>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleUpdateRow(row.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-row-container">
        <h2></h2>
        <button className="add-row-button" onClick={handleAddRow}>
          Add Row
        </button>
      </div>

      <div className="manage-columns-container">
        <h2></h2>
        <form className="add-column-form">
          <div className="form-group">
            <label></label>
            <input
              className="input-field"
              type="text"
              placeholder="Enter new column name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            />
          </div>
          <button className="add-column-button" type="button" onClick={handleAddColumn}>
            Add Column
          </button>
        </form>
      </div>
    </div>
  );
};

export default Table;
//npm install xml2js buffer timers-browserify --save stream timers xmlbuilder xmlbuilder2 xml-js