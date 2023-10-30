import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                    <MenuItem onClick={handleMenuClose}>About</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Services</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
                </Menu>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Equipay
                </Typography>
                <Link href="#" color="inherit">Home</Link>
                <Link href="#" color="inherit">About</Link>
                <Link href="#" color="inherit">Services</Link>
                <Link href="#" color="inherit">Contact</Link>
                <Button color="inherit">Login</Button>
                <Button color="inherit">Register</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
