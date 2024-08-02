import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import * as Yup from 'yup';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Ensure that the form fields align correctly */
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
  width: 200px; /* Adjust width as needed */
`;

const Select = styled(Field)`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-grow: 1;
  margin-bottom: 10px; /* Space between fields */
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

// Define validation schema using Yup
const validationSchema = Yup.object({
  type: Yup.string().required('किसिम आवश्यक छ'),
  ward: Yup.string().required('वडा आवश्यक छ'),
});

// Dummy data
const dummyData = {
  'योजना': {
    1: [{ name: 'योजना A', detail: 'विवरण A' }, { name: 'योजना B', detail: 'विवरण B' }],
    2: [{ name: 'योजना C', detail: 'विवरण C' }, { name: 'योजना D', detail: 'विवरण D' }],
    3: [{ name: 'योजना E', detail: 'विवरण E' }, { name: 'योजना F', detail: 'विवरण F' }],
    4: [{ name: 'योजना G', detail: 'विवरण G' }, { name: 'योजना H', detail: 'विवरण H' }],
    5: [{ name: 'योजना I', detail: 'विवरण I' }, { name: 'योजना J', detail: 'विवरण J' }],
    6: [{ name: 'योजना K', detail: 'विवरण K' }, { name: 'योजना L', detail: 'विवरण L' }],
    7: [{ name: 'योजना M', detail: 'विवरण M' }, { name: 'योजना N', detail: 'विवरण N' }],
  },
  'कार्यक्रम': {
    1: [{ name: 'कार्यक्रम A', detail: 'विवरण A' }, { name: 'कार्यक्रम B', detail: 'विवरण B' }],
    2: [{ name: 'कार्यक्रम C', detail: 'विवरण C' }, { name: 'कार्यक्रम D', detail: 'विवरण D' }],
    3: [{ name: 'कार्यक्रम E', detail: 'विवरण E' }, { name: 'कार्यक्रम F', detail: 'विवरण F' }],
    4: [{ name: 'कार्यक्रम G', detail: 'विवरण G' }, { name: 'कार्यक्रम H', detail: 'विवरण H' }],
    5: [{ name: 'कार्यक्रम I', detail: 'विवरण I' }, { name: 'कार्यक्रम J', detail: 'विवरण J' }],
    6: [{ name: 'कार्यक्रम K', detail: 'विवरण K' }, { name: 'कार्यक्रम L', detail: 'विवरण L' }],
    7: [{ name: 'कार्यक्रम M', detail: 'विवरण M' }, { name: 'कार्यक्रम N', detail: 'विवरण N' }],
  },
};

const QuantitativeDetail = () => {
  const [data, setData] = useState([]);

  const handleSubmit = (values) => {
    // Generate report data based on selected type and ward
    const reportData = dummyData[values.type][values.ward] || [];
    setData(reportData);
  };

  // Columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'नाम',
        accessor: 'name',
      },
      {
        Header: 'विवरण',
        accessor: 'detail',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <Container>
      <Heading>परियोजना र कार्यक्रम विवरण</Heading>
      <Formik
        initialValues={{ type: '', ward: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField>
            <Label htmlFor="type">किसिम</Label>
            <Select as="select" name="type">
              <option value="">चुननुहोस्</option>
              <option value="योजना">योजना</option>
              <option value="कार्यक्रम">कार्यक्रम</option>
            </Select>
            <ErrorMessage name="type" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="ward">वडा</Label>
            <Select as="select" name="ward">
              <option value="">चुननुहोस्</option>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>वडा नं {num}</option>
              ))}
            </Select>
            <ErrorMessage name="ward" component={ErrorText} />
          </FormField>

          <SubmitButton type="submit">सबमिट गर्नुहोस्</SubmitButton>
        </Form>
      </Formik>

      {data.length > 0 && (
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableHeader {...column.getHeaderProps()}>{column.render('Header')}</TableHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default QuantitativeDetail;
