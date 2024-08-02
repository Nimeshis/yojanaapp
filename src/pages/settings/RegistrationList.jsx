import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  sanchalanGarne: Yup.string().required('संचालन गर्ने प्रकार आवश्यक छ'),
  additionalFields: Yup.object().shape({
    // Add specific validations for each type if needed
    farmCompanyName: Yup.string().when('sanchalanGarne', {
      is: 'farm/company',
      then: Yup.string().required('कम्पनीको नाम आवश्यक छ'),
    }),
    employeeName: Yup.string().when('sanchalanGarne', {
      is: 'karmachari',
      then: Yup.string().required('कर्मचारीको नाम आवश्यक छ'),
    }),
    // Add more validations as needed
  }),
});

// Styled components for styling
const FormContainer = styled.div`
  max-width: 600px;
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
`;

const Select = styled(Field)`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
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

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem; /* Adjust size as needed */
  margin-top: 20px; /* Adjust top margin as needed */
  margin-bottom: 20px; /* Adjust bottom margin as needed */
`;

const RegistrationList = () => {
  const [selectedType, setSelectedType] = useState('');

  return (
    <FormContainer>
      <Formik
        initialValues={{
          sanchalanGarne: '',
          additionalFields: {
            farmCompanyName: '',
            employeeName: '',
            // Add more fields as needed
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form data', values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Heading>सुची दर्ताको विवरण थप्नुहोस</Heading>
            <FormField>
              <Label htmlFor="sanchalanGarne">संचालन गर्ने:</Label>
              <Select
                as="select"
                name="sanchalanGarne"
                value={values.sanchalanGarne}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedType(e.target.value);
                }}
                onBlur={handleBlur}
              >
                <option value="" label="छान्नुहोस्" />
                <option value="farm/company" label="Farm/Company" />
                <option value="karmachari" label="Karmachari" />
                <option value="sanstha" label="Sanstha" />
                <option value="padhadhakari" label="Padhadhakari" />
                <option value="anya_samuha" label="Anya Samuha" />
                <option value="upabhokta_samiti" label="Upabhokta Samiti" />
                <option value="byekti" label="Byekti" />
                <option value="nirman_bebashaya" label="Nirman Bebashaya" />
              </Select>
              <ErrorMessage name="sanchalanGarne" component={ErrorText} />
            </FormField>

            {/* Conditionally render additional form fields based on selected type */}
            {selectedType === 'farm/company' && (
              <FormField>
                <Label htmlFor="additionalFields.farmCompanyName">कम्पनीको नाम:</Label>
                <Input
                  type="text"
                  name="additionalFields.farmCompanyName"
                  placeholder="कम्पनीको नाम"
                />
                <ErrorMessage name="additionalFields.farmCompanyName" component={ErrorText} />
              </FormField>
            )}

            {selectedType === 'karmachari' && (
              <FormField>
                <Label htmlFor="additionalFields.employeeName">कर्मचारीको नाम:</Label>
                <Input
                  type="text"
                  name="additionalFields.employeeName"
                  placeholder="कर्मचारीको नाम"
                />
                <ErrorMessage name="additionalFields.employeeName" component={ErrorText} />
              </FormField>
            )}

            {/* Add more conditional fields for other types as needed */}

            <SubmitButton type="submit">पेश गर्नुहोस्</SubmitButton>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default RegistrationList;
