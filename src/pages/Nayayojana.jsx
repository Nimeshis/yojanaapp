import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

// Define initial values for the form fields
const initialValues = {
  kisim: '',
  yojanaName: '',
  kshetra: '',
  upakshetra: '',
  kharchaKisim: '',
  viniyojanKisim: '',
  wardNo: '',
  budgetSirsak: '',
  anudanRakam: '',
  binyojanShrot: '',
  firstQuarter: '',
  secondQuarter: '',
  thirdQuarter: '',
};

// Define validation schema using Yup
const validationSchema = Yup.object({
  kisim: Yup.string().required('किसिम आवश्यक छ'),
  yojanaName: Yup.string().required('योजना / कार्यक्रमको नाम आवश्यक छ'),
  kshetra: Yup.string().required('क्षेत्र आवश्यक छ'),
  upakshetra: Yup.string().required('उपक्षेत्र आवश्यक छ'),
  kharchaKisim: Yup.string().required('खर्च किसिम आवश्यक छ'),
  viniyojanKisim: Yup.string().required('विनियोजन किसिम आवश्यक छ'),
  wardNo: Yup.string().required('संचालन हुने वडा आवश्यक छ'),
  budgetSirsak: Yup.string().required('बजेट शिर्षक आवश्यक छ'),
  anudanRakam: Yup.number().required('अनुदान रु आवश्यक छ').positive('अंक सकारात्मक हुनुपर्छ'),
  binyojanShrot: Yup.string().required('बिनियोजन श्रोत र व्याख्या आवश्यक छ'),
  firstQuarter: Yup.number().required('पहिलो चौमासिक आवश्यक छ').positive('अंक सकारात्मक हुनुपर्छ'),
  secondQuarter: Yup.number().required('दोस्रो चौमासिक आवश्यक छ').positive('अंक सकारात्मक हुनुपर्छ'),
  thirdQuarter: Yup.number().required('तेस्रो चौमासिक आवश्यक छ').positive('अंक सकारात्मक हुनुपर्छ'),
});

// Define options for dropdown fields
const kisimOptions = ['योजना', 'कार्यक्रम'];
const kshetraOptions = ['वडा कार्यालय', 'अन्य क्षेत्र'];
const upakshetraOptions = ['उपक्षेत्र 1', 'उपक्षेत्र 2'];
const kharchaKisimOptions = ['पुजिखार्चा', 'चलुखार्चा'];
const viniyojanKisimOptions = ['गाउपालिका स्तरीय', 'वडा स्तरीय'];
const wardNoOptions = ['वडा नं १', 'वडा नं २', 'वडा नं ३', 'वडा नं ४', 'वडा नं ५', 'वडा नं ६', 'वडा नं ७'];
const budgetSirsakOptions = [
  'सडक बोर्ड - नगद', 'आन्तरिक श्रोत-नगद', 'नेपाल सरकार - नगद',
  'अनुदानराजस्व बाँडफाँड – स्थानीय - नगद', 'राजस्व बाँडफाँड - संघीय सरकार-नगद',
  'प्रदेश नंबर १ - नगद', 'अनुदानराजस्व बाँडफाँड - प्रदेश सरकार-नगद',
  'राजस्व बाँडफाँड - संघीय सरकार', 'नेपाल सरकार - शसर्त अनुदान चालु',
  'नेपाल सरकार-शसर्त अनुदान पुँजीगत [आन्तरिक ऋण-नगद ऋण]',
  'नेपाल सरकार-शसर्त, अनुदान चालु [आई डि ए - सोधभर्ना हुने ऋण (बैदेशिक)]',
  'नेपाल सरकार - विषेश अनुदान पुँजीगत', 'नेपाल सरकार-समपुरक अनुदान पुँजीगत [आन्तरिक ऋण-नगद ऋण]'
];

// Styled components for the form
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
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  flex: 1;
  font-weight: bold;
  margin-right: 10px;
`;

const Select = styled(Field)`
  flex: 2;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Input = styled(Field)`
  flex: 2;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NayaYojana = () => (
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
          <Heading>नया योजना / कार्यक्रम विवरण भर्नुहोस्</Heading>

          <FormField>
            <Label htmlFor="kisim">किसिम</Label>
            <Select as="select" name="kisim">
              <option value="">चुननुहोस्</option>
              {kisimOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <ErrorMessage name="kisim" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="yojanaName">योजना / कार्यक्रमको नाम</Label>
            <Input type="text" name="yojanaName" placeholder="योजना / कार्यक्रमको नाम"/>
            <ErrorMessage name="yojanaName" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="kshetra">क्षेत्र</Label>
            <Select as="select" name="kshetra">
              <option value="">चुननुहोस्</option>
              {kshetraOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <ErrorMessage name="kshetra" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="upakshetra">उपक्षेत्र</Label>
            <Select as="select" name="upakshetra">
              <option value="">चुननुहोस्</option>
              {upakshetraOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <ErrorMessage name="upakshetra" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="kharchaKisim">खर्च किसिम</Label>
            <Select as="select" name="kharchaKisim">
              <option value="">चुननुहोस्</option>
              {kharchaKisimOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <ErrorMessage name="kharchaKisim" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="viniyojanKisim">विनियोजन किसिम</Label>
            <Select as="select" name="viniyojanKisim">
              <option value="">चुननुहोस्</option>
              {viniyojanKisimOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <ErrorMessage name="viniyojanKisim" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="wardNo">संचालन हुने वडा</Label>
            <Select as="select" name="wardNo">
              <option value="">चुननुहोस्</option>
              {wardNoOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <ErrorMessage name="wardNo" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="budgetSirsak">बजेट शिर्षक</Label>
            <Select as="select" name="budgetSirsak">
              <option value="">चुननुहोस्</option>
              {budgetSirsakOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            <ErrorMessage name="budgetSirsak" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="anudanRakam">अनुदान रु</Label>
            <Input type="number" name="anudanRakam" placeholder="अनुदान रकम" />
            <ErrorMessage name="anudanRakam" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="binyojanShrot">बिनियोजन श्रोत र व्याख्या</Label>
            <Input type="text" name="binyojanShrot" placeholder="बिनियोजन श्रोत र व्याख्या" />
            <ErrorMessage name="binyojanShrot" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="firstQuarter">पहिलो चौमासिक</Label>
            <Input type="number" name="firstQuarter" placeholder="पहिलो चौमासिक" />
            <ErrorMessage name="firstQuarter" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="secondQuarter">दोस्रो चौमासिक</Label>
            <Input type="number" name="secondQuarter" placeholder="दोस्रो चौमासिक"/>
            <ErrorMessage name="secondQuarter" component={ErrorText} />
          </FormField>

          <FormField>
            <Label htmlFor="thirdQuarter">तेस्रो चौमासिक</Label>
            <Input type="number" name="thirdQuarter" placeholder="तेस्रो चौमासिक" />
            <ErrorMessage name="thirdQuarter" component={ErrorText} />
          </FormField>

          <SubmitButton type="submit">सबमिट गर्नुहोस्</SubmitButton>
        </Form>
      )}
    </Formik>
  </FormContainer>
);

export default NayaYojana;
