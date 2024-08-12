import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import * as Yup from "yup";

const initialValues = {
  kisim: "",
  yojanaName: "",
  kshetra: "",
  upakshetra: [],
  kharchaKisim: "",
  viniyojanKisim: "",
  wardNo: "",
  sanchalanHuneWards: [],
  sanchalanGarneWards: [],
  budgetSirsak: "",
  anudanRakam: "",
  binyojanShrot: "",
  firstQuarter: "",
  secondQuarter: "",
  thirdQuarter: "",
};

const validationSchema = Yup.object({
  kisim: Yup.string().required("किसिम आवश्यक छ"),
  yojanaName: Yup.string().required("योजना / कार्यक्रमको नाम आवश्यक छ"),
  kshetra: Yup.string().required("क्षेत्र आवश्यक छ"),
  upakshetra: Yup.array().when("kshetra", {
    is: (kshetra) => !!kshetra,
    then: Yup.array().min(1, "कम्तिमा १ उपक्षेत्र चयन गर्नुहोस्"),
  }),
  kharchaKisim: Yup.string().required("खर्च किसिम आवश्यक छ"),
  viniyojanKisim: Yup.string().required("विनियोजन किसिम आवश्यक छ"),
  sanchalanGarneWards: Yup.array().when("viniyojanKisim", {
    is: "वडा स्तरीय",
    then: Yup.array().min(1, "कम्तिमा १ वडा चयन गर्नुहोस्"),
  }),
  budgetSirsak: Yup.string().required("बजेट शिर्षक आवश्यक छ"),
  anudanRakam: Yup.number()
    .required("अनुदान रु आवश्यक छ")
    .positive("अंक सकारात्मक हुनुपर्छ"),
  binyojanShrot: Yup.string().required("बिनियोजन श्रोत र व्याख्या आवश्यक छ"),
  firstQuarter: Yup.number()
    .required("पहिलो चौमासिक आवश्यक छ")
    .positive("अंक सकारात्मक हुनुपर्छ"),
  secondQuarter: Yup.number()
    .required("दोस्रो चौमासिक आवश्यक छ")
    .positive("अंक सकारात्मक हुनुपर्छ"),
  thirdQuarter: Yup.number()
    .required("तेस्रो चौमासिक आवश्यक छ")
    .positive("अंक सकारात्मक हुनुपर्छ"),
});

const kisimOptions = ["योजना", "कार्यक्रम"];
const kshetraOptions = [
  "पूर्वाधार विकास",
  "आर्थिक विकास",
  "सामाजिक विकास",
  "सुसासन तथा संस्थागत विकास",
  "वन वातावरण तथा बिपत व्यबस्थापन",
];
const upakshetraOptions = {
  "पूर्वाधार विकास": ["उपक्षेत्र 1", "उपक्षेत्र 2"],
  "आर्थिक विकास": ["उपक्षेत्र 3", "उपक्षेत्र 4"],
  "सामाजिक विकास": ["उपक्षेत्र 5", "उपक्षेत्र 6"],
  "सुसासन तथा संस्थागत विकास": ["उपक्षेत्र 7", "उपक्षेत्र 8"],
  "वन वातावरण तथा बिपत व्यबस्थापन": ["उपक्षेत्र 9", "उपक्षेत्र 10"],
};
const kharchaKisimOptions = ["पुजिखार्चा", "चलुखार्चा"];
const viniyojanKisimOptions = ["गाउपालिका स्तरीय", "वडा स्तरीय"];
const wardOptions = [
  { value: "वडा नं १", label: "वडा नं १" },
  { value: "वडा नं २", label: "वडा नं २" },
  { value: "वडा नं ३", label: "वडा नं ३" },
  { value: "वडा नं ४", label: "वडा नं ४" },
  { value: "वडा नं ५", label: "वडा नं ५" },
  { value: "वडा नं ६", label: "वडा नं ६" },
  { value: "वडा नं ७", label: "वडा नं ७" },
];
const budgetSirsakOptions = [
  "सडक बोर्ड - नगद",
  "आन्तरिक श्रोत-नगद",
  "नेपाल सरकार - नगद",
  "अनुदानराजस्व बाँडफाँड – स्थानीय - नगद",
  "राजस्व बाँडफाँड - संघीय सरकार-नगद",
  "प्रदेश नंबर १ - नगद",
  "अनुदानराजस्व बाँडफाँड - प्रदेश सरकार-नगद",
  "राजस्व बाँडफाँड - संघीय सरकार",
  "नेपाल सरकार - शसर्त अनुदान चालु",
  "नेपाल सरकार-शसर्त अनुदान पुँजीगत [आन्तरिक ऋण-नगद ऋण]",
  "नेपाल सरकार-शसर्त, अनुदान चालु [आई डि ए - सोधभर्ना हुने ऋण (बैदेशिक)]",
  "नेपाल सरकार - विषेश अनुदान पुँजीगत",
  "नेपाल सरकार-समपुरक अनुदान पुँजीगत [आन्तरिक ऋण-नगद ऋण]",
];
const budgetData = {
  "सडक बोर्ड - नगद": { actualBudget: 1000000 },
  "आन्तरिक श्रोत-नगद": { actualBudget: 2000000 },
  "नेपाल सरकार - नगद": { actualBudget: 1500000 },
  "अनुदानराजस्व बाँडफाँड – स्थानीय - नगद": { actualBudget: 500000 },
  // Add more budget types as needed
};

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

const StyledSelect = styled(Select)`
  flex: 2;
  padding: 10px;
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

const NayaYojana = () => {
  const [selectedKshetra, setSelectedKshetra] = useState("");
  const [viniyojanKisim, setViniyojanKisim] = useState("");
  const [selectedBudgetSirsak, setSelectedBudgetSirsak] = useState("");
  const [remainingBudget, setRemainingBudget] = useState(null);

  const handleBudgetSirsakChange = (option, setFieldValue) => {
    const value = option.value;
    setSelectedBudgetSirsak(value);
    setFieldValue("budgetSirsak", value);

    // Reset remaining budget when a new budget type is selected
    setRemainingBudget(budgetData[value]?.actualBudget || null);
  };

  const handleAnudanRakamChange = (event, setFieldValue) => {
    const amount = parseFloat(event.target.value) || 0;
    setFieldValue("anudanRakam", amount);

    // Calculate remaining budget
    const actualBudget = budgetData[selectedBudgetSirsak]?.actualBudget || 0;
    setRemainingBudget(actualBudget - amount);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form data", values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Heading>नया योजना / कार्यक्रम विवरण भर्नुहोस्</Heading>

            <FormField>
              <Label htmlFor="kisim">प्रकार</Label>
              <StyledSelect
                name="kisim"
                options={kisimOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(option) => setFieldValue("kisim", option.value)}
                value={
                  kisimOptions.find((option) => option === values.kisim)
                    ? { value: values.kisim, label: values.kisim }
                    : null
                }
              />
              <ErrorMessage name="kisim" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="yojanaName">योजना / कार्यक्रमको नाम</Label>
              <Input
                type="text"
                name="yojanaName"
                placeholder="योजना / कार्यक्रमको नाम"
              />
              <ErrorMessage name="yojanaName" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="kshetra">क्षेत्र</Label>
              <StyledSelect
                name="kshetra"
                options={kshetraOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(option) => {
                  const value = option.value;
                  setSelectedKshetra(value);
                  setFieldValue("kshetra", value);
                  setFieldValue("upakshetra", []);
                }}
                value={
                  kshetraOptions.find((option) => option === values.kshetra)
                    ? { value: values.kshetra, label: values.kshetra }
                    : null
                }
              />
              <ErrorMessage name="kshetra" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="upakshetra">उपक्षेत्र</Label>
              <StyledSelect
                isMulti
                name="upakshetra"
                options={upakshetraOptions[selectedKshetra]?.map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(option) => {
                  const values = option ? option.map((opt) => opt.value) : [];
                  setFieldValue("upakshetra", values);
                }}
                value={values.upakshetra?.map((selected) => ({
                  value: selected,
                  label: selected,
                }))}
              />
              <ErrorMessage name="upakshetra" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="kharchaKisim">खर्च किसिम</Label>
              <StyledSelect
                name="kharchaKisim"
                options={kharchaKisimOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(option) =>
                  setFieldValue("kharchaKisim", option.value)
                }
                value={
                  kharchaKisimOptions.find(
                    (option) => option === values.kharchaKisim
                  )
                    ? { value: values.kharchaKisim, label: values.kharchaKisim }
                    : null
                }
              />
              <ErrorMessage name="kharchaKisim" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="viniyojanKisim">विनियोजन किसिम</Label>
              <StyledSelect
                name="viniyojanKisim"
                options={viniyojanKisimOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(option) => {
                  setViniyojanKisim(option.value);
                  setFieldValue("viniyojanKisim", option.value);
                  setFieldValue("sanchalanGarneWards", []);
                }}
                value={
                  viniyojanKisimOptions.find(
                    (option) => option === values.viniyojanKisim
                  )
                    ? {
                        value: values.viniyojanKisim,
                        label: values.viniyojanKisim,
                      }
                    : null
                }
              />
              <ErrorMessage name="viniyojanKisim" component={ErrorText} />
            </FormField>

            {viniyojanKisim === "गाउपालिका स्तरीय" && (
              <FormField>
                <Label htmlFor="sanchalanHuneWards">संचालन हुने वडा</Label>
                <StyledSelect
                  isMulti
                  name="sanchalanHuneWards"
                  options={wardOptions}
                  onChange={(option) =>
                    setFieldValue(
                      "sanchalanHuneWards",
                      option ? option.map((opt) => opt.value) : []
                    )
                  }
                  value={values.sanchalanHuneWards?.map((ward) => ({
                    value: ward,
                    label: ward,
                  }))}
                />
                <ErrorMessage name="sanchalanHuneWards" component={ErrorText} />
              </FormField>
            )}

            {viniyojanKisim === "वडा स्तरीय" && (
              <FormField>
                <Label htmlFor="sanchalanHuneWards">संचालन हुने वडा</Label>
                <StyledSelect
                  isMulti
                  name="sanchalanHuneWards"
                  options={wardOptions}
                  onChange={(option) =>
                    setFieldValue(
                      "sanchalanHuneWards",
                      option ? option.map((opt) => opt.value) : []
                    )
                  }
                  value={values.sanchalanHuneWards?.map((ward) => ({
                    value: ward,
                    label: ward,
                  }))}
                />
                <ErrorMessage name="sanchalanHuneWards" component={ErrorText} />
              </FormField>
            )}

            {viniyojanKisim === "वडा स्तरीय" && (
              <FormField>
                <Label htmlFor="sanchalanGarneWards">संचालन गर्ने वडाहरु</Label>
                <StyledSelect
                  isMulti
                  name="sanchalanGarneWards"
                  options={wardOptions}
                  onChange={(option) =>
                    setFieldValue(
                      "sanchalanGarneWards",
                      option ? option.map((opt) => opt.value) : []
                    )
                  }
                  value={values.sanchalanGarneWards?.map((ward) => ({
                    value: ward,
                    label: ward,
                  }))}
                />
                <ErrorMessage
                  name="sanchalanGarneWards"
                  component={ErrorText}
                />
              </FormField>
            )}
            <FormField>
              <Label htmlFor="budgetSirsak">बजेट शिर्षक</Label>
              <Field
                name="budgetSirsak"
                component={({ field, form }) => (
                  <StyledSelect
                    {...field}
                    options={Object.keys(budgetData).map((key) => ({
                      value: key,
                      label: key,
                    }))}
                    onChange={(option) =>
                      handleBudgetSirsakChange(option, setFieldValue)
                    }
                  />
                )}
              />
              <ErrorMessage name="budgetSirsak" component={ErrorText} />
            </FormField>

            {selectedBudgetSirsak && (
              <>
                <FormField>
                  <Label htmlFor="anudanRakam">अनुदान रकम</Label>
                  <Input
                    type="number"
                    name="anudanRakam"
                    onChange={(event) =>
                      handleAnudanRakamChange(event, setFieldValue)
                    }
                  />
                  <ErrorMessage name="anudanRakam" component={ErrorText} />
                </FormField>

                {remainingBudget !== null && (
                  <>
                    <FormField>
                      <Label>वास्तविक बजेट</Label>
                      <div>
                        {budgetData[selectedBudgetSirsak]?.actualBudget || 0}
                      </div>
                    </FormField>

                    <FormField>
                      <Label>बाँकी बजेट</Label>
                      <div>{remainingBudget}</div>
                    </FormField>
                  </>
                )}
              </>
            )}
            {/* <FormField>
              <Label htmlFor="budgetSirsak">बजेट शिर्षक</Label>
              <StyledSelect
                name="budgetSirsak"
                options={budgetSirsakOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(option) =>
                  setFieldValue("budgetSirsak", option.value)
                }
                value={
                  budgetSirsakOptions.find(
                    (option) => option === values.budgetSirsak
                  )
                    ? {
                        value: values.budgetSirsak,
                        label: values.budgetSirsak,
                      }
                    : null
                }
              />
              <ErrorMessage name="budgetSirsak" component={ErrorText} />
            </FormField> */}

            {/* <FormField>
              <Label htmlFor="anudanRakam">अनुदान रु</Label>
              <Input type="number" name="anudanRakam" placeholder="अनुदान रु" />
              <ErrorMessage name="anudanRakam" component={ErrorText} />
            </FormField> */}

            <FormField>
              <Label htmlFor="binyojanShrot">बिनियोजन श्रोत</Label>
              <Input
                type="text"
                name="binyojanShrot"
                placeholder="बिनियोजन श्रोत र व्याख्या"
              />
              <ErrorMessage name="binyojanShrot" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="firstQuarter">पहिलो चौमासिक</Label>
              <Input
                type="number"
                name="firstQuarter"
                placeholder="पहिलो चौमासिक"
              />
              <ErrorMessage name="firstQuarter" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="secondQuarter">दोस्रो चौमासिक</Label>
              <Input
                type="number"
                name="secondQuarter"
                placeholder="दोस्रो चौमासिक"
              />
              <ErrorMessage name="secondQuarter" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="thirdQuarter">तेस्रो चौमासिक</Label>
              <Input
                type="number"
                name="thirdQuarter"
                placeholder="तेस्रो चौमासिक"
              />
              <ErrorMessage name="thirdQuarter" component={ErrorText} />
            </FormField>

            <SubmitButton type="submit">पेश गर्नुहोस्</SubmitButton>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default NayaYojana;
