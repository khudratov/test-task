import React, { useState, ReactNode } from 'react';
import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	useMediaQuery,
	Divider,
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

interface Props {
	children?: ReactNode;
}

const drawerWidth = 240;

const drawerItems = [
	{
		text: 'Todos',
		icon: <TodayIcon />,
		path: '/todos',
	},
];

const AuthLayout: React.FC<Props> = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const open = Boolean(anchorEl);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const navigate = useNavigate();
	const location = useLocation();
	const logout = () => null; // useLogout();

	const user = {
		name: 'John Doe',
		avatarUrl: 'https://example.com/user-avatar.jpg',
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const drawer = (
		<Box width={'100%'} height={'100%'}>
			<Toolbar>
				<Avatar
					src={user.avatarUrl}
					alt={user.name}
					sx={{ width: 56, height: 56 }}
				/>
			</Toolbar>
			<Divider />
			<List>
				{drawerItems.map(item => (
					<ListItemButton
						key={item.text}
						onClick={() => navigate(item.path)}
						sx={{
							backgroundColor:
								location.pathname === item.path
									? 'rgba(0, 0, 0, 0.08)'
									: 'transparent',
						}}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItemButton>
				))}
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex', height: '100vh' }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
				<Toolbar>
					{isMobile && (
						<IconButton
							color="inherit"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Box sx={{ flexGrow: 1 }} />
					<IconButton onClick={handleMenuOpen}>
						<Avatar src={user.avatarUrl} alt={user.name} />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleMenuClose}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						<MenuItem
							onClick={() => {
								logout();
								handleMenuClose();
							}}
						>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>

			<Drawer
				variant={isMobile ? 'temporary' : 'permanent'}
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
			>
				{drawer}
			</Drawer>

			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default AuthLayout;
