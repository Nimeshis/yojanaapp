import fetchDataFromAPI from "@app/modules/api/api";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const DartaForm = ({ endpoint }) => {
  const [dartaNumber, setDartaNumber] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleFetchDarta = async () => {
    try {
      if (!dartaNumber) {
        setError("Please enter a Darta number");
        return;
      }
      const data = await fetchDataFromAPI("GET", `${endpoint}/${dartaNumber}`);
      if (data) {
        history.push(`/plan/${dartaNumber}`, { data });
      } else {
        setError("Darta number not found.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Fetch Darta Information</h2>
      <TextField
        label="Enter Darta Number"
        fullWidth
        variant="outlined"
        value={dartaNumber}
        onChange={(e) => setDartaNumber(e.target.value)}
        error={!!error}
        helperText={error}
        style={{ marginBottom: "16px" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleFetchDarta}
      >
        Fetch Darta
      </Button>
    </div>
  );
};

export default DartaForm;
