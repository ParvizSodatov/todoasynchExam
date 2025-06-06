import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import img from "./assets/i.webp";

export default function App() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Parviz",
      email: "parviz@gmail.com",
      phone: "04040404",
      country: "USA",
      completed: false,
      photo: img,
    },
    {
      id: "2",
      name: "Mia Khalifa",
      email: "elena@example.com",
      phone: "09098976",
      country: "USA",
      completed: true,
      photo: img,
    },
    {
      id: "3",
      name: "Shuhrat",
      email: "shuhrat@gmail.com",
      phone: "9980898",
      country: "Pamir",
      completed: false,
      photo: img,
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const cities = ["All", "USA", "Pamir", "DuBAi", "Brasil", "Canada"];

  const handleDelete = (id) => {
    setUsers(users.filter((el) => el.id !== id));
  };

  const handleEdit = (user) => {
    setCurrentUser({ ...user });
    setOpen(true);
  };

  const handleAdd = () => {
    setCurrentUser({
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      country: "",
      completed: false,
      photo: img,
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (
      !currentUser.name ||
      !currentUser.email ||
      !currentUser.phone ||
      !currentUser.country
    )
      return;

    const exists = users.some((el) => el.id === currentUser.id);
    if (exists) {
      setUsers(users.map((el) => (el.id === currentUser.id ? currentUser : el)));
    } else {
      setUsers([...users, currentUser]);
    }

    setOpen(false);
  };

  const handleCompleteToggle = (id) => {
    setUsers(
      users.map((user) =>
      user.id === id ? { ...user, completed: !user.completed } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    return (
      (statusFilter === "All" ||
        (statusFilter === "Active" ? user.completed : !user.completed)) &&
      (cityFilter === "All" || user.country === cityFilter) &&
      `${user.name} ${user.email} ${user.phone} ${user.country}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Todo List</Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add User
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        <TextField
          label="Search"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Status"
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <TextField
          label="City"
          select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img
                      src={user.photo}
                      alt="avatar"
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                    />
                    <Box>
                      <Typography>{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <Typography
                    color={user.completed ? "green" : "red"}
                    fontWeight="bold"
                  >
                    {user.completed ? "ACTIVE" : "INACTIVE"}
                  </Typography>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleCompleteToggle(user.id)}
                    >
                      COMPLETED
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentUser?.id ? "Edit User" : "Add User"}
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              fullWidth
              value={currentUser?.name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              value={currentUser?.email || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
            />
            <TextField
              label="Phone"
              fullWidth
              value={currentUser?.phone || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, phone: e.target.value })
              }
            />
            <TextField
              label="City"
              fullWidth
              value={currentUser?.country || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, country: e.target.value })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.completed || false}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      completed: e.target.checked,
                    })
                  }
                />
              }
              label="Completed"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
