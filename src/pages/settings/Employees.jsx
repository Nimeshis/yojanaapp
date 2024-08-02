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

// Define data with initial rows
const data = [
  { symbolNo: '१', name: "राम ढकाल", position: 'प्रमुख प्रशासकिय अधिकृत', actions: '' },
  { symbolNo: "२", name: "सीता काफ्ले", position: "अध्यक्ष", actions: "" },
  { symbolNo: "३", name: "गिता बिष्ट", position: "सचिव", actions: "" },
  { symbolNo: "४", name: "हरि प्रसाद", position: "कोषाध्यक्ष", actions: "" },
];

const positions = [
  "प्रमुख प्रशासकिय अधिकृत",
  "अध्यक्ष",
  "सचिव",
  "कोषाध्यक्ष",
  "अन्य" // Add more positions as needed
];

const Employees = () => {
  const [tableData, setTableData] = useState(data);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({ symbolNo: '', name: '', position: '' });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'symbolNo',
        header: 'सि.नं',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'कर्मचारीको नाम',
        size: 150,
      },
      {
        accessorKey: 'position',
        header: 'कर्मचारीको पद',
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
    setNewEntry({ symbolNo: '', name: '', position: '' });
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
        <h1>कर्मचारी</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ कर्मचारी थप्नुहोस्</DialogTitle>
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
            label="कर्मचारीको नाम"
            fullWidth
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="कर्मचारीको पद"
            fullWidth
            select
            value={newEntry.position}
            onChange={(e) => setNewEntry({ ...newEntry, position: e.target.value })}
          >
            {positions.map((pos) => (
              <MenuItem key={pos} value={pos}>
                {pos}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleCreate}>थप्नुहोस्</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>कर्मचारी सम्पादित गर्नुहोस्</DialogTitle>
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
            label="कर्मचारीको नाम"
            fullWidth
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="कर्मचारीको पद"
            fullWidth
            select
            value={newEntry.position}
            onChange={(e) => setNewEntry({ ...newEntry, position: e.target.value })}
          >
            {positions.map((pos) => (
              <MenuItem key={pos} value={pos}>
                {pos}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleSaveEdit}>सुरू गर्नुहोस्</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Employees;
