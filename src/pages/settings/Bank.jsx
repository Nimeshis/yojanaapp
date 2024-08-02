import DeleteIcon from '@mui/icons-material/Delete';
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
  { symbolNo: '१', name: "नेपाल बैंक", address: "काठमाडौं", actions: '' },
  { symbolNo: '२', name: "राष्ट्र बैंक", address: "ललितपुर", actions: '' },
  { symbolNo: '३', name: "एनआईसी एशिया बैंक", address: "पोखरा", actions: '' },
];

const Bank = () => {
  const [tableData, setTableData] = useState(data);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ symbolNo: '', name: '', address: '' });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'symbolNo',
        header: 'सि.नं',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'बैंकको नाम',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'बैंकको ठेगाना',
        size: 150,
      },
      {
        id: 'actions',
        header: 'कार्य',
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
    setNewEntry({ symbolNo: '', name: '', address: '' });
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
        <h1>बैंक</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ बैंक थप्नुहोस्</DialogTitle>
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
            label="बैंकको नाम"
            fullWidth
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="बैंकको ठेगाना"
            fullWidth
            value={newEntry.address}
            onChange={(e) => setNewEntry({ ...newEntry, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>रद्द गर्नुहोस्</Button>
          <Button onClick={handleCreate}>थप्नुहोस्</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Bank;
