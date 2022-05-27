import { styled } from "@mui/system";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardHeader,
  TextField
} from "@mui/material";
import { login } from "./utils/login";
import { useState } from "react";

const LoginCard = styled(Card)({
  padding: "20px 50px"
});

const LoginCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: "20px"
});

const LoginCardActions = styled(CardActions)({
  display: "flex",
  justifyContent: "center"
});

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await login(username, password);
      setLoggedIn(true);
      setNotification("Successfully logged in.");
      setTimeout(() => setNotification(""), 2000);
    } catch (error) {
      setNotification("Wrong username or password. Try again");
    }

    setLoading(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h1">Welcome</Typography>
      </Grid>

      <Grid item>
        <LoginCard raised>
          <CardHeader
            title={
              <Typography variant="h5" align="center">
                Please Login
              </Typography>
            }
          />
          <Typography color={loggedIn ? "success.main" : "error.main"}>
            {notification}
          </Typography>
          <LoginCardContent>
            <TextField
              label="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              helperText="Do not share your password with anyone"
              type="password"
              label="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </LoginCardContent>

          <LoginCardActions>
            <Button size="large" variant="contained" onClick={handleLogin}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </LoginCardActions>
        </LoginCard>
      </Grid>
    </Grid>
  );
}
