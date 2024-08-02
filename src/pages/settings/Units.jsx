import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useMemo, useState } from 'react';

// Define data with three rows
const data = [
  { unit: 'किलोमिटर', description: '--', actions: '' },
  { unit: 'वर्गमिटर', description: '--', actions: '' },
  { unit: 'सारणी', description: '--', actions: '' },
  { unit: 'हजार', description: '--', actions: '' },
  { unit: 'लिटर', description: '--', actions: '' },
  { unit: 'किलोग्राम', description: '--', actions: '' },
  { unit: 'मिटर', description: '--', actions: '' },
  { unit: 'घनमिटर', description: '--', actions: '' },
  { unit: 'सेन्टिमिटर', description: '--', actions: '' },
  { unit: 'मिलिमिटर', description: '--', actions: '' },
  { unit: 'अम्पियर', description: '--', actions: '' },
  { unit: 'वोल्ट', description: '--', actions: '' },
  { unit: 'वाट', description: '--', actions: '' },
  { unit: 'मासिक', description: '--', actions: '' },
  { unit: 'साप्ताहिक', description: '--', actions: '' },
  { unit: 'दैनिक', description: '--', actions: '' },
  { unit: 'घण्टा', description: '--', actions: '' },
  { unit: 'सेकेन्ड', description: '--', actions: '' },
  { unit: 'डिग्री', description: '--', actions: '' },
  { unit: 'रेडियन', description: '--', actions: '' },
  { unit: 'पिक्सल', description: '--', actions: '' },
  { unit: 'जोल', description: '--', actions: '' },
  { unit: 'डेसिबल', description: '--', actions: '' },
  { unit: 'ग्रेड', description: '--', actions: '' },
  { unit: 'टन', description: '--', actions: '' },
  { unit: 'गैलन', description: '--', actions: '' },
  { unit: 'पाउन्ड', description: '--', actions: '' },
  { unit: 'यार्ड', description: '--', actions: '' },
  { unit: 'फुट', description: '--', actions: '' },
];

const Units = () => {
  const [tableData, setTableData] = useState(data);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create'); // 'create' or 'edit'
  const [currentRow, setCurrentRow] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'unit',
        header: 'इकाई',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'वर्णन',
        size: 250,
      },
      {
        id: 'actions',
        header: 'कार्य',
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={() => handleEdit(row.original)} color="primary">
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

  const handleOpen = (mode = 'create', row = null) => {
    setDialogMode(mode);
    setCurrentRow(row);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCurrentRow(null);
  };

  const handleSave = () => {
    if (dialogMode === 'create') {
      setTableData([...tableData, { unit: newUnit, description: newDescription, actions: '' }]);
    } else {
      setTableData(tableData.map(row => row.unit === currentRow.unit ? { ...currentRow, unit: newUnit, description: newDescription } : row));
    }
    handleClose();
  };

  const handleEdit = (row) => {
    setNewUnit(row.unit);
    setNewDescription(row.description);
    handleOpen('edit', row);
  };

  const handleDelete = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  const [newUnit, setNewUnit] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1>इकाई</h1>
        <Button variant="contained" color="primary" onClick={() => handleOpen('create')}>
          नया थप्नुहोस
        </Button>
      </div>

      <MaterialReactTable table={table} />

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{dialogMode === 'create' ? 'नया थप्नुहोस्' : 'सच्याउनुहोस्'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="इकाई"
            fullWidth
            variant="outlined"
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
          />
          <TextField
            margin="dense"
            label="वर्णन"
            fullWidth
            variant="outlined"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {dialogMode === 'create' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Units;
