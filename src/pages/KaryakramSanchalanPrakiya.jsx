import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

// Define initial values for the form fields
const initialValues = {
  kisim: '',
};

// Define validation schema using Yup
const validationSchema = Yup.object({
  kisim: Yup.string().required('कार्यक्रमको नाम / दफा फारम नं आवश्यक छ'),
});

// Styled components for the form
const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  border: 1px solid #ddd;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const FormField = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1rem;
`;

const Input = styled(Field)`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

// Main component
const KaryakramSanchalan = () => (
  <FormContainer>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form data', values);
      }}
    >
      {() => (
        <Form>
          <Heading>कार्यक्रम संचालन प्रकिया</Heading>
          <FormField>
            <Label htmlFor="kisim">कार्यक्रमको नाम / दफा फारम नं:</Label>
            <Input
              type="text"
              name="kisim"
              placeholder="कार्यक्रमको नाम / दफा फारम नं"
            />
            <ErrorMessage name="kisim" component={ErrorText} />
          </FormField>
          <SubmitButton type="submit">खोज्नुहोस</SubmitButton>
        </Form>
      )}
    </Formik>
  </FormContainer>
);

export default KaryakramSanchalan;
