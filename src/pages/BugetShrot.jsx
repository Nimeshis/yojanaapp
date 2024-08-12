import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton"; // For better styling
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";

// Nepali data
const initialData = [
  { id: 1, name: "सडक बोर्ड - नगद", amount: 1000000 },
  { id: 2, name: "आन्तरिक श्रोत-नगद", amount: 500000 },
  { id: 3, name: "नेपाल सरकार - नगद", amount: 1500000 },
  { id: 4, name: "अनुदानराजस्व बाँडफाँड – स्थानीय - नगद", amount: 750000 },
  { id: 5, name: "राजस्व बाँडफाँड - संघीय सरकार-नगद", amount: 1200000 },
  { id: 6, name: "प्रदेश नंबर १ - नगद", amount: 850000 },
  { id: 7, name: "अनुदानराजस्व बाँडफाँड - प्रदेश सरकार-नगद", amount: 650000 },
  { id: 8, name: "राजस्व बाँडफाँड - संघीय सरकार", amount: 2000000 },
  { id: 9, name: "नेपाल सरकार - शसर्त अनुदान चालु", amount: 300000 },
  {
    id: 10,
    name: "नेपाल सरकार-शसर्त अनुदान पुँजीगत [आन्तरिक ऋण-नगद ऋण]",
    amount: 450000,
  },
  {
    id: 11,
    name: "नेपाल सरकार-शसर्त, अनुदान चालु [आई डि ए - सोधभर्ना हुने ऋण (बैदेशिक)]",
    amount: 100000,
  },
  { id: 12, name: "नेपाल सरकार - विषेश अनुदान पुँजीगत", amount: 700000 },
  {
    id: 13,
    name: "नेपाल सरकार-समपुरक अनुदान पुँजीगत [आन्तरिक ऋण-नगद ऋण]",
    amount: 900000,
  },
];

const BudgetShrot = () => {
  const [data, setData] = useState(initialData);

  const handleEdit = (rowIndex) => {
    // Handle edit logic
    console.log("Edit row", rowIndex);
  };

  const handleDelete = (rowIndex) => {
    // Handle delete logic
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
    console.log("Deleted row", rowIndex);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "दर्ता नं",
        size: 100,
      },
      {
        accessorKey: "name",
        header: "बजेटको नाम",
        size: 200,
      },

      {
        accessorKey: "amount",
        header: "अनुदान रकम",
        size: 150,
      },

      {
        id: "actions",
        header: "कार्य",
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton onClick={() => handleEdit(row.index)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.index)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    [data]
  );

  const table = useMaterialReactTable({
    columns,
    data, // Data must be memoized or stable
  });

  return <MaterialReactTable table={table} />;
};

export default BudgetShrot;
