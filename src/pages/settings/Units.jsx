import fetchDataFromAPI from "@app/modules/api/api"; // Import the API function
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const Units = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create"); // 'create' or 'edit'
  const [currentRow, setCurrentRow] = useState(null);
  const [newUnit, setNewUnit] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI("GET", "unit");
        setTableData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "unit",
        header: "इकाई",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "वर्णन",
        size: 250,
      },
      {
        id: "actions",
        header: "कार्य",
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              onClick={() => handleEdit(row.original)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.original.id)} // Use the API to delete
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const handleOpen = (mode = "create", row = null) => {
    setDialogMode(mode);
    setCurrentRow(row);
    if (row) {
      setNewUnit(row.unit);
      setNewDescription(row.description);
    } else {
      setNewUnit("");
      setNewDescription("");
    }
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCurrentRow(null);
  };

  const handleSave = async () => {
    try {
      if (dialogMode === "create") {
        // Add a new unit
        const newData = await fetchDataFromAPI("POST", "unit", {
          unit: newUnit,
          description: newDescription,
        });
        setTableData([...tableData, newData]);
      } else {
        // Edit an existing unit
        const updatedData = await fetchDataFromAPI(
          "PUT",
          `unit/${currentRow.id}`,
          {
            unit: newUnit,
            description: newDescription,
          }
        );
        setTableData(
          tableData.map((row) => (row.id === currentRow.id ? updatedData : row))
        );
      }
      handleClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (row) => {
    handleOpen("edit", row);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this unit?"
    );
    if (!confirmed) return;

    try {
      await fetchDataFromAPI("DELETE", `unit/${id}`);
      setTableData(tableData.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>इकाई</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen("create")}
        >
          नया थप्नुहोस
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {loading ? <CircularProgress /> : <MaterialReactTable table={table} />}
      </div>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {dialogMode === "create" ? "नया थप्नुहोस्" : "सच्याउनुहोस्"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="इकाई"
            fullWidth
            variant="outlined"
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
          />
          <TextField
            margin="dense"
            label="वर्णन"
            fullWidth
            variant="outlined"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {dialogMode === "create" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Units;
