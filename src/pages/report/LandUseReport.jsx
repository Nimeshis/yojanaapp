import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from '@mui/material';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { useMemo, useState } from 'react';

// Initial data
const initialData = [
  { id: '१', landType: 'कृषि', area: '५००', usage: 'खेती', actions: '' },
  { id: '२', landType: 'वाणिज्य', area: '७००', usage: 'व्यापार', actions: '' },
];

const LanduseReport = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({ id: '', landType: '', area: '', usage: '' });

  // Columns configuration
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'आईडी', size: 50 },
      { accessorKey: 'landType', header: 'भूमि प्रकार', size: 150 },
      { accessorKey: 'area', header: 'क्षेत्रफल (वर्ग मीटर)', size: 150 },
      { accessorKey: 'usage', header: 'उपयोग', size: 150 },
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

  // Handle create operation
  const handleCreate = () => {
    setTableData([...tableData, { ...newEntry, actions: '' }]);
    setOpenCreateDialog(false);
    setNewEntry({ id: '', landType: '', area: '', usage: '' });
  };

  // Handle edit operation
  const handleEdit = (rowIndex) => {
    setEditRowIndex(rowIndex);
    setNewEntry(tableData[rowIndex]);
    setOpenEditDialog(true);
  };

  // Handle save edit operation
  const handleSaveEdit = () => {
    const updatedData = tableData.map((row, index) =>
      index === editRowIndex ? newEntry : row
    );
    setTableData(updatedData);
    setOpenEditDialog(false);
    setEditRowIndex(null);
  };

  // Handle delete operation
  const handleDelete = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  // Material React Table instance
  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>मलेप रिपोर्ट</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ प्रविष्टि सिर्जना गर्नुहोस्</DialogTitle>
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
            label="भूमि प्रकार"
            fullWidth
            value={newEntry.landType}
            onChange={(e) => setNewEntry({ ...newEntry, landType: e.target.value })}
          />
          <TextField
            margin="dense"
            label="क्षेत्रफल (वर्ग मीटर)"
            fullWidth
            value={newEntry.area}
            onChange={(e) => setNewEntry({ ...newEntry, area: e.target.value })}
          />
          <TextField
            margin="dense"
            label="उपयोग"
            fullWidth
            value={newEntry.usage}
            onChange={(e) => setNewEntry({ ...newEntry, usage: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleCreate}>सुरू गर्नुहोस्</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>प्रविष्टि सम्पादित गर्नुहोस्</DialogTitle>
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
            label="भूमि प्रकार"
            fullWidth
            value={newEntry.landType}
            onChange={(e) => setNewEntry({ ...newEntry, landType: e.target.value })}
          />
          <TextField
            margin="dense"
            label="क्षेत्रफल (वर्ग मीटर)"
            fullWidth
            value={newEntry.area}
            onChange={(e) => setNewEntry({ ...newEntry, area: e.target.value })}
          />
          <TextField
            margin="dense"
            label="उपयोग"
            fullWidth
            value={newEntry.usage}
            onChange={(e) => setNewEntry({ ...newEntry, usage: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleSaveEdit}>सुरू गर्नुहोस्</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LanduseReport;
