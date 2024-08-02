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
  { symbolNo: "१", position: "प्रमुख प्रशासकिय अधिकृत", description: "--", actions: "" },
  { symbolNo: "२", position: "लेखा अधिकृत", description: "--", actions: "" },
  { symbolNo: "३", position: "सूचना अधिकारी", description: "--", actions: "" },
  { symbolNo: "४", position: "कार्यालय सहायक", description: "--", actions: "" },
  { symbolNo: "५", position: "प्रशासकीय सहायक", description: "--", actions: "" },
  { symbolNo: "६", position: "शाखा प्रमुख", description: "--", actions: "" },
  { symbolNo: "७", position: "उप-प्रमुख", description: "--", actions: "" },
  { symbolNo: "८", position: "आईटी अधिकृत", description: "--", actions: "" },
  { symbolNo: "९", position: "नायब सुब्बा", description: "--", actions: "" },
  { symbolNo: "१०", position: "कनिष्ठ सहायक", description: "--", actions: "" },
];

const EmployeePosition = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ symbolNo: '', position: '', description: '' });
  const [editEntry, setEditEntry] = useState({ symbolNo: '', position: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'symbolNo',
        header: 'सि.नं',
        size: 50,
      },
      {
        accessorKey: 'position',
        header: 'कर्मचारीको पद',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'बिवरण',
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
    setNewEntry({ symbolNo: '', position: '', description: '' });
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
    setEditEntry({ symbolNo: '', position: '', description: '' });
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
        <h1>कर्मचारी पद</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ कर्मचारी पद थप्नुहोस्</DialogTitle>
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
            label="कर्मचारीको पद"
            fullWidth
            value={newEntry.position}
            onChange={(e) => setNewEntry({ ...newEntry, position: e.target.value })}
          />
          <TextField
            margin="dense"
            label="बिवरण"
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
        <DialogTitle>कर्मचारी पद सम्पादन गर्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="सि.नं"
            fullWidth
            value={editEntry.symbolNo}
            onChange={(e) => setEditEntry({ ...editEntry, symbolNo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="कर्मचारीको पद"
            fullWidth
            value={editEntry.position}
            onChange={(e) => setEditEntry({ ...editEntry, position: e.target.value })}
          />
          <TextField
            margin="dense"
            label="बिवरण"
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

export default EmployeePosition;
