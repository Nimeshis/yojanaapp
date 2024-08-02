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

// Define data with some initial rows
const data = [
  { symbolNo: '१', Process: 'टोल विकास समिति', actions: '' },
  { symbolNo: '२', Process: 'उपभोक्ता समिति', actions: '' },
  { symbolNo: '३', Process: 'संस्था समिति', actions: '' },
  { symbolNo: '४', Process: 'अमानत', actions: '' },
  { symbolNo: '५', Process: 'ठेक्का', actions: '' },
  { symbolNo: '६', Process: 'कार्यक्रम', actions: '' },
];

const Terms = () => {
  const [tableData, setTableData] = useState(data);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({ symbolNo: '', Process: '' });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'symbolNo',
        header: 'सि.नं',
        size: 50,
      },
      {
        accessorKey: 'Process',
        header: 'संचालन प्रकिया',
        size: 150,
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
    setTableData([...tableData, { ...newEntry, actions: '' }]);
    setOpenCreateDialog(false);
    setNewEntry({ symbolNo: '', Process: '' });
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
        <h1>शर्तहरु</h1>
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
            label="सि.नं"
            fullWidth
            value={newEntry.symbolNo}
            onChange={(e) => setNewEntry({ ...newEntry, symbolNo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="संचालन प्रकिया"
            fullWidth
            value={newEntry.Process}
            onChange={(e) => setNewEntry({ ...newEntry, Process: e.target.value })}
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
            label="सि.नं"
            fullWidth
            value={newEntry.symbolNo}
            onChange={(e) => setNewEntry({ ...newEntry, symbolNo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="संचालन प्रकिया"
            fullWidth
            value={newEntry.Process}
            onChange={(e) => setNewEntry({ ...newEntry, Process: e.target.value })}
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

export default Terms;
