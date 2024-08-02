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
  { id: '१', committeeName: 'स्थानीय विकास समिति', members: '१५', roles: 'विभिन्न', actions: '' },
  { id: '२', committeeName: 'स्वास्थ्य समिति', members: '१०', roles: 'स्वास्थ्य सेवा', actions: '' },
];

const CommitteeDescription = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({ id: '', committeeName: '', members: '', roles: '' });

  // Columns configuration
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'आईडी', size: 50 },
      { accessorKey: 'committeeName', header: 'समिति नाम', size: 150 },
      { accessorKey: 'members', header: 'सदस्य संख्या', size: 150 },
      { accessorKey: 'roles', header: 'भूमिकाहरु', size: 150 },
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
    setNewEntry({ id: '', committeeName: '', members: '', roles: '' });
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
        <h1>समिति विस्तृत विवरण</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ समिति प्रविष्टि सिर्जना गर्नुहोस्</DialogTitle>
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
            label="समिति नाम"
            fullWidth
            value={newEntry.committeeName}
            onChange={(e) => setNewEntry({ ...newEntry, committeeName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="सदस्य संख्या"
            fullWidth
            value={newEntry.members}
            onChange={(e) => setNewEntry({ ...newEntry, members: e.target.value })}
          />
          <TextField
            margin="dense"
            label="भूमिकाहरु"
            fullWidth
            value={newEntry.roles}
            onChange={(e) => setNewEntry({ ...newEntry, roles: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleCreate}>सुरू गर्नुहोस्</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>समिति प्रविष्टि सम्पादित गर्नुहोस्</DialogTitle>
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
            label="समिति नाम"
            fullWidth
            value={newEntry.committeeName}
            onChange={(e) => setNewEntry({ ...newEntry, committeeName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="सदस्य संख्या"
            fullWidth
            value={newEntry.members}
            onChange={(e) => setNewEntry({ ...newEntry, members: e.target.value })}
          />
          <TextField
            margin="dense"
            label="भूमिकाहरु"
            fullWidth
            value={newEntry.roles}
            onChange={(e) => setNewEntry({ ...newEntry, roles: e.target.value })}
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

export default CommitteeDescription;
