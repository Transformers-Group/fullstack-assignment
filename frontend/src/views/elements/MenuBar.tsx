import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Slide, useScrollTrigger } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../common/ui/Logo';

type NavItem = {
    text: string;
    path: string;
};
const navItems: NavItem[] = [];

function HideOnScroll({ children }: { children: React.ReactElement }) {
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function MenuBar({
    window,
    logoOnFullScreen,
    sx
}: {
    window?: Window;
    logoOnFullScreen: boolean;
    sx: any;
}) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map(item => (
                    <ListItem key={item.path} disablePadding component={Link} to={item.path}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText
                                primary={item.text}
                                sx={{ color: t => t.palette.text.primary }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;
    return (
        <>
            <HideOnScroll>
                <AppBar component="nav" sx={{ ...{ boxShadow: 'none' }, ...sx }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                        {logoOnFullScreen && (
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, minWidth: '180px' }}>
                                <Logo sx={{ height: '40px' }} />
                            </Box>
                        )}
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, minWidth: '150px' }}>
                            <Logo sx={{ height: '35px' }} />
                        </Box>
                        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                            {navItems.map(item => (
                                <Link to={item.path} key={item.path}>
                                    <Button
                                        sx={{
                                            color: t => t.palette.primary.main,
                                            textTransform: 'none',
                                            fontSize: '15px',
                                            mr: '15px',
                                            ':hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}>
                                        {item.text}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '300px' }
                    }}>
                    {drawer}
                </Drawer>
            </nav>
        </>
    );
}

export default MenuBar;
