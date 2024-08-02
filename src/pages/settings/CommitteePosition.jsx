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

// Define Nepali numerals conversion
const toNepaliNumerals = (number) => {
  const nepaliNumerals = '०१२३४५६७८९';
  return number.toString().replace(/\d/g, (digit) => nepaliNumerals[digit]);
};

// Define data with initial rows
const initialData = [
  { id: "१", position: "अध्यक्ष", description: "---" },
  { id: "२", position: "सदस्य", description: "---" },
  { id: "३", position: "सचिव", description: "---" },
  { id: "४", position: "कोषाध्यक्ष", description: "---" },
  { id: "५", position: "सहायक सदस्य", description: "---" },
];

const CommitteePosition = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ id: '', position: '', description: '' });
  const [editEntry, setEditEntry] = useState({ id: '', position: '', description: '' });
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
        accessorKey: 'position',
        header: 'पद',
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
    setNewEntry({ id: '', position: '', description: '' });
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
    setEditEntry({ id: '', position: '', description: '' });
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
        <h1>समितिको पद</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ समितिको पद थप्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="पद"
            fullWidth
            value={newEntry.position}
            onChange={(e) => setNewEntry({ ...newEntry, position: e.target.value })}
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
        <DialogTitle>समितिको पद सम्पादन गर्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="पद"
            fullWidth
            value={editEntry.position}
            onChange={(e) => setEditEntry({ ...editEntry, position: e.target.value })}
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

export default CommitteePosition;
