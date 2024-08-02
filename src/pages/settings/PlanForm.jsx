import { Field, FieldArray, Form, Formik } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  yojanaDartaNumbers: Yup.array().of(
    Yup.string().required('दर्ता नम्बर आवश्यक छ')
  ),
});

// Styled components for styling
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled(Field)`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-right: 10px; /* Add margin to separate from buttons */
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
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

const CancelButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px; /* Add margin to separate from input field */
  &:hover {
    background-color: #ff0000;
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem; /* Adjust size as needed */
  margin-top: 20px; /* Adjust top margin as needed */
  margin-bottom: 20px; /* Adjust bottom margin as needed */
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
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

const PlanForm = () => {
  const [tableData, setTableData] = useState([]);

  return (
    <FormContainer>
      <Formik
        initialValues={{ yojanaDartaNumbers: [''] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Convert darta numbers to example data for demonstration
          const newTableData = values.yojanaDartaNumbers.map((number) => ({
            yojanaName: 'Example योजना',
            anudanRakam: `रु ${number} लाख`,
          }));
          setTableData(newTableData);
          console.log('Form data', values);
        }}
      >
        {({ values }) => (
          <Form>
            <Heading>योजना मर्ज गर्नुहोस्</Heading>
            <FormField>
              <Label htmlFor="yojanaDartaNumbers">योजना दर्ता नम्बर:</Label>
              <FieldArray name="yojanaDartaNumbers">
                {({ push, remove }) => (
                  <div>
                    {values.yojanaDartaNumbers.map((_, index) => (
                      <FieldWrapper key={index}>
                        <Field name={`yojanaDartaNumbers[${index}]`} as={Input} placeholder="दर्ता नम्बर" />
                        <CancelButton
                          type="button"
                          onClick={() => remove(index)}
                        >
                          -
                        </CancelButton>
                      </FieldWrapper>
                    ))}
                    <SubmitButton
                      type="button"
                      onClick={() => push('')}
                    >
                      +
                    </SubmitButton>
                  </div>
                )}
              </FieldArray>
            </FormField>
            <SubmitButton type="submit">मर्ज गर्नुहोस्</SubmitButton>
          </Form>
        )}
      </Formik>

      {/* Table to display the submitted data */}
      <Table>
        <thead>
          <tr>
            <TableHeader>योजना नाम</TableHeader>
            <TableHeader>अनुदान रकम</TableHeader>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <TableCell>{row.yojanaName}</TableCell>
              <TableCell>{row.anudanRakam}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </FormContainer>
  );
};

export default PlanForm;
