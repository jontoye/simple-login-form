import { styled } from "@mui/system";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  TextField
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { login } from "./utils/login";
import { useReducer } from "react";

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

const loginReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        loading: true
      };
    }
    case "success": {
      return {
        ...state,
        loading: false,
        loggedIn: true,
        notification: ""
      };
    }
    case "failure": {
      return {
        ...state,
        loading: false,
        username: "",
        password: "",
        notification: "Wrong username or password. Try again"
      };
    }
    case "logout": {
      return {
        ...state,
        username: "",
        password: "",
        loggedIn: false
      };
    }
    case "field": {
      return {
        ...state,
        [action.field]: action.value
      };
    }
    default:
      break;
  }
  return state;
};

const initialState = {
  username: "",
  password: "",
  loading: false,
  notification: "",
  loggedIn: false
};

export default function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, loading, notification, loggedIn } = state;

  const handleUsernameChange = (e) => {
    dispatch({
      type: "field",
      field: "username",
      value: e.currentTarget.value
    });
  };

  const handlePasswordChange = (e) => {
    dispatch({
      type: "field",
      field: "password",
      value: e.currentTarget.value
    });
  };

  const handleLogin = async () => {
    dispatch({ type: "login" });

    try {
      await login(username, password);
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "failure" });
    }
  };

  const handleLogout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h1">Welcome</Typography>
      </Grid>

      <Grid item>
        {loggedIn ? (
          <>
            <Typography align="center" variant="h4">
              Hello {username}!
            </Typography>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
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
                autoFocus
                label="username"
                value={username}
                onChange={handleUsernameChange}
                disabled={loggedIn}
              />
              <TextField
                helperText="Do not share your password with anyone"
                type="password"
                label="password"
                value={password}
                onChange={handlePasswordChange}
                disabled={loggedIn}
              />
            </LoginCardContent>

            <LoginCardActions>
              <LoadingButton
                loading={loading}
                size="large"
                variant="contained"
                onClick={handleLogin}
                disabled={loggedIn}
              >
                Login
              </LoadingButton>
            </LoginCardActions>
          </LoginCard>
        )}
      </Grid>
    </Grid>
  );
}
