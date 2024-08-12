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
  {
    dartaNo: "१",
    yojanaName: "सडक निर्माण",
    budgetSirsak: "५०१",
    viniyojanKisim: "स्थानीय",
    wadaNo: "१",
    anudanRakam: "१० लाख",
    kharchaRakam: "८ लाख",
    bankRakam: "२ लाख",
  },
  {
    dartaNo: "२",
    yojanaName: "विद्यालय निर्माण",
    budgetSirsak: "५०२",
    viniyojanKisim: "प्रदेश",
    wadaNo: "२",
    anudanRakam: "१५ लाख",
    kharchaRakam: "१० लाख",
    bankRakam: "५ लाख",
  },
  {
    dartaNo: "३",
    yojanaName: "स्वास्थ्य केन्द्र",
    budgetSirsak: "५०३",
    viniyojanKisim: "संघीय",
    wadaNo: "३",
    anudanRakam: "२० लाख",
    kharchaRakam: "१५ लाख",
    bankRakam: "५ लाख",
  },
  {
    dartaNo: "४",
    yojanaName: "पुल निर्माण",
    budgetSirsak: "५०४",
    viniyojanKisim: "स्थानीय",
    wadaNo: "४",
    anudanRakam: "२५ लाख",
    kharchaRakam: "२० लाख",
    bankRakam: "५ लाख",
  },
  {
    dartaNo: "५",
    yojanaName: "खेल मैदान निर्माण",
    budgetSirsak: "५०५",
    viniyojanKisim: "प्रदेश",
    wadaNo: "५",
    anudanRakam: "३० लाख",
    kharchaRakam: "२५ लाख",
    bankRakam: "५ लाख",
  },
  {
    dartaNo: "६",
    yojanaName: "पानी टंकी निर्माण",
    budgetSirsak: "५०६",
    viniyojanKisim: "संघीय",
    wadaNo: "६",
    anudanRakam: "३५ लाख",
    kharchaRakam: "२८ लाख",
    bankRakam: "७ लाख",
  },
  {
    dartaNo: "७",
    yojanaName: "डिजिटल शिक्षा",
    budgetSirsak: "५०७",
    viniyojanKisim: "स्थानीय",
    wadaNo: "७",
    anudanRakam: "४० लाख",
    kharchaRakam: "३२ लाख",
    bankRakam: "८ लाख",
  },
  {
    dartaNo: "८",
    yojanaName: "सामुदायिक भवन",
    budgetSirsak: "५०८",
    viniyojanKisim: "प्रदेश",
    wadaNo: "८",
    anudanRakam: "४५ लाख",
    kharchaRakam: "३६ लाख",
    bankRakam: "९ लाख",
  },
];

const yojanaKaryakram = () => {
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
        accessorKey: "dartaNo",
        header: "दर्ता नं",
        size: 100,
      },
      {
        accessorKey: "yojanaName",
        header: "योजना नाम",
        size: 200,
      },
      {
        accessorKey: "budgetSirsak",
        header: "बजेट सिरसक",
        size: 150,
      },
      {
        accessorKey: "viniyojanKisim",
        header: "विनियोजन किसिम",
        size: 150,
      },
      {
        accessorKey: "wadaNo",
        header: "वडा नं",
        size: 100,
      },
      {
        accessorKey: "anudanRakam",
        header: "अनुदान रकम",
        size: 150,
      },
      {
        accessorKey: "kharchaRakam",
        header: "खर्च रकम",
        size: 150,
      },
      {
        accessorKey: "bankRakam",
        header: "बैंक रकम",
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

export default yojanaKaryakram;
