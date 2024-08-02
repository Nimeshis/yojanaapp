import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useState } from 'react';

// Define some demo data
const demoStatuses = ['योजनाको अवस्था', 'योजनाहरुको संचालन अवस्था'];
const demoWards = [1, 2, 3, 4, 5, 6, 7];
const demoPlans = [
  { name: 'योजना १', priceRange: ['< ५० हजार', '५० हजार - १ लाख'] },
  { name: 'योजना २', priceRange: ['१ लाख - ५ लाख', '५ लाख - १० लाख'] },
  { name: 'योजना ३', priceRange: ['१० लाख - १ करोड'] },
];
const demoPriceRanges = [
  '< ५० हजार',
  '५० हजार - १ लाख',
  '१ लाख - ५ लाख',
  '५ लाख - १० लाख',
  '१० लाख - १ करोड'
];

const PlanDetail = () => {
  const [formState, setFormState] = useState({
    condition: '',
    ward: '',
    plan: '',
    priceRange: '',
  });
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formState]);
    setFormState({
      condition: '',
      ward: '',
      plan: '',
      priceRange: '',
    });
  };

  // Filter price ranges based on selected Yojana
  const selectedPlan = demoPlans.find(plan => plan.name === formState.plan);
  const priceRanges = selectedPlan ? selectedPlan.priceRange : demoPriceRanges;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        योजना बिस्तृत विवरण
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <FormControl fullWidth>
            <InputLabel>अवस्था</InputLabel>
            <Select
              value={formState.condition}
              onChange={(e) => setFormState({ ...formState, condition: e.target.value })}
            >
              {demoStatuses.map((status, index) => (
                <MenuItem key={index} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>वडा नं</InputLabel>
            <Select
              value={formState.ward}
              onChange={(e) => setFormState({ ...formState, ward: e.target.value })}
            >
              {demoWards.map((ward) => (
                <MenuItem key={ward} value={ward}>{ward}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {formState.condition === 'योजनाको अवस्था' && (
          <FormControl fullWidth>
            <InputLabel>मूल्य</InputLabel>
            <Select
              value={formState.priceRange}
              onChange={(e) => setFormState({ ...formState, priceRange: e.target.value })}
            >
              {demoPriceRanges.map((range, index) => (
                <MenuItem key={index} value={range}>{range}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {formState.condition === 'योजनाहरुको संचालन अवस्था' && (
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <FormControl fullWidth>
              <InputLabel>योजना को नाम</InputLabel>
              <Select
                value={formState.plan}
                onChange={(e) => setFormState({ ...formState, plan: e.target.value })}
              >
                {demoPlans.map((plan) => (
                  <MenuItem key={plan.name} value={plan.name}>{plan.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>मूल्य</InputLabel>
              <Select
                value={formState.priceRange}
                onChange={(e) => setFormState({ ...formState, priceRange: e.target.value })}
              >
                {priceRanges.map((range, index) => (
                  <MenuItem key={index} value={range}>{range}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          सुरु गर्नुहोस्
        </Button>
      </form>

      {submittedData.length > 0 && (
        <>
          <Divider sx={{ marginY: 3 }} />
          <Typography variant="h6" gutterBottom>
            सबमिट गरिएका विवरण
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>अवस्था</TableCell>
                  <TableCell>वडा नं</TableCell>
                  <TableCell>योजना को नाम</TableCell>
                  <TableCell>मूल्य</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submittedData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.condition}</TableCell>
                    <TableCell>{data.ward}</TableCell>
                    <TableCell>{data.plan}</TableCell>
                    <TableCell>{data.priceRange}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default PlanDetail;
