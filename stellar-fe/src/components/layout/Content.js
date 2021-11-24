import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AddUserModal } from "../people/AddUserModal";
import { addUser } from "../../methods/addUser";

export default function Content() {

  const [isUiUpdating, setIsUiUpdating] = React.useState(false);
  const [makeUserModalVisible, setMakeUserModalVisible] = React.useState(
    false
  )

  const handleCreateUser = async ({
    fullname,
    phone,
    amount,
    address,
    country,
    jobTitle
  }) => {
    try {
      // 🌎 Indicating that UI is loading
      setIsUiUpdating(true);

      // 🚀 add user helper method
      await addUser({
        fullname,
        phone,
        amount,
        address,
        country,
        jobTitle
      });
      // 🌎 Fetching updated account information
      // refreshAccount();
      // 🌎 Indicating that UI is done loading
      setIsUiUpdating(false);
    } catch (e) {
      // 🌎 Handle make payment error here
      setIsUiUpdating(false);
    }
  };

  return (
    <>
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }} onClick={() => setMakeUserModalVisible(true)}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        No users for this project yet
      </Typography>
    </Paper>

    <AddUserModal
      visible={makeUserModalVisible} 
      onClose={() => setMakeUserModalVisible(false)}
      onDone = {handleCreateUser}
    />
    </>

  );
}
