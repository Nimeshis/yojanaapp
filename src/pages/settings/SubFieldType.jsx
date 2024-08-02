import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo, useState } from 'react';

// Define Nepali numerals conversion
const toNepaliNumerals = (number) => {
  const nepaliNumerals = '०१२३४५६७८९';
  return number.toString().replace(/\d/g, (digit) => nepaliNumerals[digit]);
};

// Sample data for "क्षेत्र" (Field)
const fields = [
  { id: "१", field: "आर्थिक विकास" },
  { id: "२", field: "पूर्वाधार विकास" },
  { id: "३", field: "वन बातावरण तथा बिपद ब्यबस्थापन" },
  { id: "४", field: "सामाजिक बिकास" },
  { id: "५", field: "सुसासन तथा संस्थागत बिकास" },
];

// Define data with initial rows
const initialData = [
  { id: "१", fieldId: "१", subField: "वित्तीय योजना", description: "---" },
  { id: "२", fieldId: "१", subField: "सञ्चालन प्रबन्धन", description: "---" },
  { id: "३", fieldId: "२", subField: "सडक निर्माण", description: "---" },
  { id: "४", fieldId: "३", subField: "वन संरक्षण", description: "---" },
  { id: "५", fieldId: "४", subField: "शिक्षा सुधार", description: "---" },
];

const SubFieldTypes = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ id: '', fieldId: '', subField: '', description: '' });
  const [editEntry, setEditEntry] = useState({ id: '', fieldId: '', subField: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
        Cell: ({ cell }) => toNepaliNumerals(cell.getValue()),
      },
      {
        accessorKey: 'fieldId',
        header: 'क्षेत्र',
        size: 150,
        Cell: ({ row }) => fields.find(field => field.id === row.original.fieldId)?.field || 'उपलब्ध छैन',
      },
      {
        accessorKey: 'subField',
        header: 'उपक्षेत्र',
        size: 200,
      },
      {
        accessorKey: 'description',
        header: 'विवरण',
        size: 200,
      },
      {
        id: 'actions',
        header: 'कार्य',
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={() => handleEdit(row.index)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.index)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const handleCreate = () => {
    setTableData([...tableData, { ...newEntry, id: toNepaliNumerals(tableData.length + 1) }]);
    setOpenCreateDialog(false);
    setNewEntry({ id: '', fieldId: '', subField: '', description: '' });
  };

  const handleEdit = (rowIndex) => {
    const selectedEntry = tableData[rowIndex];
    setEditEntry({ ...selectedEntry });
    setEditIndex(rowIndex);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    const updatedData = tableData.map((row, index) => (index === editIndex ? editEntry : row));
    setTableData(updatedData);
    setOpenEditDialog(false);
    setEditEntry({ id: '', fieldId: '', subField: '', description: '' });
    setEditIndex(null);
  };

  const handleDelete = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>उपक्षेत्र</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ उपक्षेत्र थप्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="क्षेत्र"
            select
            fullWidth
            value={newEntry.fieldId}
            onChange={(e) => setNewEntry({ ...newEntry, fieldId: e.target.value })}
          >
            {fields.map((field) => (
              <MenuItem key={field.id} value={field.id}>
                {field.field}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="उपक्षेत्र"
            fullWidth
            value={newEntry.subField}
            onChange={(e) => setNewEntry({ ...newEntry, subField: e.target.value })}
          />
          <TextField
            margin="dense"
            label="विवरण"
            fullWidth
            value={newEntry.description}
            onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleCreate}>थप्नुहोस्</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>उपक्षेत्र सम्पादन गर्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="क्षेत्र"
            select
            fullWidth
            value={editEntry.fieldId}
            onChange={(e) => setEditEntry({ ...editEntry, fieldId: e.target.value })}
          >
            {fields.map((field) => (
              <MenuItem key={field.id} value={field.id}>
                {field.field}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="उपक्षेत्र"
            fullWidth
            value={editEntry.subField}
            onChange={(e) => setEditEntry({ ...editEntry, subField: e.target.value })}
          />
          <TextField
            margin="dense"
            label="विवरण"
            fullWidth
            value={editEntry.description}
            onChange={(e) => setEditEntry({ ...editEntry, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleEditSave}>सुरक्षित गर्नुहोस्</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubFieldTypes;
