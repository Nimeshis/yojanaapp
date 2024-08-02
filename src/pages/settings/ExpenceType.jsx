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
  { id: "1", expenseType: "भाडा", amount: "५०००", description: "मासिक भाडा भुक्तानी" },
  { id: "2", expenseType: "उपयोगिता", amount: "२००", description: "बिजुली र पानीको बिल" },
  { id: "3", expenseType: "किराना", amount: "३००", description: "मासिक किराना" },
  { id: "4", expenseType: "यातायात", amount: "१५०", description: "मासिक यातायात खर्च" },
];

const ExpenseType = () => {
  const [tableData, setTableData] = useState(initialData);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ id: '', expenseType: '', amount: '', description: '' });
  const [editEntry, setEditEntry] = useState({ id: '', expenseType: '', amount: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'expenseType',
        header: 'खर्चको प्रकार',
        size: 150,
      },
      {
        accessorKey: 'amount',
        header: 'रकम',
        size: 100,
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
    setNewEntry({ id: '', expenseType: '', amount: '', description: '' });
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
    setEditEntry({ id: '', expenseType: '', amount: '', description: '' });
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
        <h1>खर्चको प्रकार</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
          नयाँ थप्नुहोस्
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>नयाँ खर्चको प्रकार थप्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="खर्चको प्रकार"
            fullWidth
            value={newEntry.expenseType}
            onChange={(e) => setNewEntry({ ...newEntry, expenseType: e.target.value })}
          />
          <TextField
            margin="dense"
            label="रकम"
            fullWidth
            value={newEntry.amount}
            onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
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
        <DialogTitle>खर्चको प्रकार सम्पादन गर्नुहोस्</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="खर्चको प्रकार"
            fullWidth
            value={editEntry.expenseType}
            onChange={(e) => setEditEntry({ ...editEntry, expenseType: e.target.value })}
          />
          <TextField
            margin="dense"
            label="रकम"
            fullWidth
            value={editEntry.amount}
            onChange={(e) => setEditEntry({ ...editEntry, amount: e.target.value })}
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

export default ExpenseType;
