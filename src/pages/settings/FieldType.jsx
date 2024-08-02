import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo, useState } from 'react';

// Define data with initial rows
const initialData = [
  { id: "१", field: "आर्थिक विकास", description: "---" },
  { id: "२", field: "पूर्वाधार विकास", description: "---" },
  { id: "३", field: "वन बातावरण तथा बिपद ब्यबस्थापन", description: "---" },
  { id: "४", field: "सामाजिक बिकास", description: "---" },
  { id: "५", field: "सुसासन तथा संस्थागत बिकास", description: "---" },
];

const FieldType = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ id: '', field: '', description: '' });
  const [editEntry, setEditEntry] = useState({ id: '', field: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'field',
        header: 'क्षेत्र',
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
    setTableData([...tableData, { ...newEntry, id: (tableData.length + 1).toString() }]);
    setOpenCreateDialog(false);
    setNewEntry({ id: '', field: '', description: '' });
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
    setEditEntry({ id: '', field: '', description: '' });
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
        <h1>क्षेत्र</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ क्षेत्र थप्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="क्षेत्र"
            fullWidth
            value={newEntry.field}
            onChange={(e) => setNewEntry({ ...newEntry, field: e.target.value })}
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
        <DialogTitle>क्षेत्र सम्पादन गर्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="क्षेत्र"
            fullWidth
            value={editEntry.field}
            onChange={(e) => setEditEntry({ ...editEntry, field: e.target.value })}
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

export default FieldType;
