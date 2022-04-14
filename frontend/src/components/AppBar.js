import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";

// Im aware that we shouldnt use <a/> because it kills purpose of SPAs
// but I have some weird bug with react router that I cannot resolve tonight :/ 
const StyledNavLink = styled.a`
  text-decoration: none;
  color: white;
`;

const AppBarComponent = () => {
  const [anchorElNav, setAnchorElNav] = React.useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            ChainApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledNavLink href="/login">
                  Login
                </StyledNavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledNavLink href="/register">
                  Register
                </StyledNavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledNavLink href="/rapid-api-content">
                  Rapid Api Content
                </StyledNavLink>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            ChainApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <StyledNavLink href="/login">
                Login
              </StyledNavLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <StyledNavLink href="/register">
                Register
              </StyledNavLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <StyledNavLink href="/rapid-api-content">
                Rapid Api Content
              </StyledNavLink>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppBarComponent;
