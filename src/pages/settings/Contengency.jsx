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
const data = [
  { symbolNo: "१", type: "टि.डी.य्स. कट्टी", taxrate: "१५", actions: "" },
  { symbolNo: "२", type: "अन्य", taxrate: "१५", actions: "" },
];

const Contengency = () => {
  const [tableData, setTableData] = useState(data);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ symbolNo: '', type: '', taxrate: '' });
  const [editEntry, setEditEntry] = useState({ symbolNo: '', type: '', taxrate: '' });
  const [editIndex, setEditIndex] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'symbolNo',
        header: 'सि.नं',
        size: 50,
      },
      {
        accessorKey: 'type',
        header: 'प्रकार',
        size: 150,
      },
      {
        accessorKey: 'taxrate',
        header: 'कन्टेन्जेन्सी कट्टी प्रतिसत',
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
    setNewEntry({ symbolNo: '', type: '', taxrate: '' });
  };

  const handleEdit = (rowIndex) => {
    setEditEntry(tableData[rowIndex]);
    setEditIndex(rowIndex);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    const updatedData = tableData.map((row, index) => (index === editIndex ? editEntry : row));
    setTableData(updatedData);
    setOpenEditDialog(false);
    setEditEntry({ symbolNo: '', type: '', taxrate: '' });
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
        <h1>कन्टेन्जेन्सी</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ कन्टेन्जेन्सी थप्नुहोस्</DialogTitle>
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
            label="प्रकार"
            fullWidth
            value={newEntry.type}
            onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="कन्टेन्जेन्सी कट्टी प्रतिसत"
            fullWidth
            value={newEntry.taxrate}
            onChange={(e) => setNewEntry({ ...newEntry, taxrate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleCreate}>थप्नुहोस्</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>कन्टेन्जेन्सी सम्पादन गर्नुहोस्</DialogTitle>
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
            label="प्रकार"
            fullWidth
            value={editEntry.type}
            onChange={(e) => setEditEntry({ ...editEntry, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="कन्टेन्जेन्सी कट्टी प्रतिसत"
            fullWidth
            value={editEntry.taxrate}
            onChange={(e) => setEditEntry({ ...editEntry, taxrate: e.target.value })}
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

export default Contengency;
