import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { usePagination, useTable } from 'react-table';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  background: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const GenderTypes = () => {
  const [data, setData] = useState([
    { id: 1, genderType: 'पुरुष' },
    { id: 2, genderType: 'महिला' },
    { id: 3, genderType: 'अन्य' },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentGenderType, setCurrentGenderType] = useState({ id: null, genderType: '' });

  const columns = React.useMemo(
    () => [
      {
        Header: 'आईडी',
        accessor: 'id',
      },
      {
        Header: 'लिङ्ग प्रकार',
        accessor: 'genderType',
      },
      {
        Header: 'कार्यहरू',
        Cell: ({ row }) => (
          <div>
            <Button onClick={() => editRow(row.original)}>सम्पादन गर्नुहोस्</Button>
            <Button onClick={() => deleteRow(row.original.id)}>हटाउनुहोस्</Button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, usePagination);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = tableInstance;

  const addGenderType = (genderType) => {
    setData([...data, { id: data.length + 1, genderType }]);
  };

  const editRow = (genderType) => {
    setEditing(true);
    setCurrentGenderType(genderType);
  };

  const updateGenderType = (id, updatedGenderType) => {
    setEditing(false);
    setData(data.map((genderType) => (genderType.id === id ? updatedGenderType : genderType)));
  };

  const deleteRow = (id) => {
    setData(data.filter((genderType) => genderType.id !== id));
  };

  return (
    <div>
      <TableContainer>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>

      <FormContainer>
        <Formik
          initialValues={editing ? currentGenderType : { genderType: '' }}
          onSubmit={(values) => {
            editing ? updateGenderType(currentGenderType.id, values) : addGenderType(values.genderType);
          }}
        >
          <Form>
            <FormField>
              <Label htmlFor="genderType">लिङ्ग प्रकार:</Label>
              <Input type="text" name="genderType" placeholder="लिङ्ग प्रकार" />
            </FormField>
            <SubmitButton type="submit">{editing ? 'अद्यावधिक गर्नुहोस्' : 'थप्नुहोस्'}</SubmitButton>
          </Form>
        </Formik>
      </FormContainer>
    </div>
  );
};

export default GenderTypes;
