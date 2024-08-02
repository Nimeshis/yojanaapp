import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useMemo, useState } from 'react';

// Define initial data
const initialData = [
  { id: '१', type: 'प्रकार 1', description: 'विवरण 1' },
  { id: '२', type: 'प्रकार 2', description: 'विवरण 2' },
  { id: '३', type: 'प्रकार 3', description: 'विवरण 3' },
];

const DeductionDetail = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({ id: '', type: '', description: '' });

  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'आईडी', size: 50 },
    { accessorKey: 'type', header: 'प्रकार', size: 150 },
    { accessorKey: 'description', header: 'विवरण', size: 200 },
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
  ], []);

  const handleCreate = () => {
    setTableData([...tableData, { ...newEntry, id: (tableData.length + 1).toString() }]);
    setOpenCreateDialog(false);
    setNewEntry({ id: '', type: '', description: '' });
  };

  const handleEdit = (rowIndex) => {
    setEditRowIndex(rowIndex);
    setNewEntry(tableData[rowIndex]);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedData = tableData.map((row, index) =>
      index === editRowIndex ? newEntry : row
    );
    setTableData(updatedData);
    setOpenEditDialog(false);
    setEditRowIndex(null);
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
        <h1>कट्टी विवरण</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />
      
      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ कट्टी विवरण सिर्जना गर्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="आईडी"
            fullWidth
            value={newEntry.id}
            onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })}
          />
          <TextField
            margin="dense"
            label="प्रकार"
            fullWidth
            value={newEntry.type}
            onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
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
        <DialogTitle>कट्टी विवरण सम्पादित गर्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="आईडी"
            fullWidth
            value={newEntry.id}
            onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })}
          />
          <TextField
            margin="dense"
            label="प्रकार"
            fullWidth
            value={newEntry.type}
            onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
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
          <Button onClick={() => setOpenEditDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleSaveEdit}>सहेज गर्नुहोस्</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeductionDetail;
