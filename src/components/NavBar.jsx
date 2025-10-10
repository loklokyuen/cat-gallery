import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { NavLink } from "react-router";

function NavBar({ user, avatarURL }) {
	const pages = ["Home", "Gallery"];
	const settings = ["Profile", "Activity"];
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* for xs/mobile view, show a menu icon instead of expanding the list of pages */}
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="menu"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit">
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
							sx={{ display: { xs: "block", md: "none" } }}>
							{pages.map((page) => (
								<MenuItem
									key={page}
									component={NavLink}
									to={"/" + page}
									onClick={handleCloseNavMenu}>
									<Typography sx={{ textAlign: "center" }}>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}>
						<i className="fa-solid fa-cat"></i>
					</Box>
					<MenuItem component={NavLink} to={"/"}>
						<Typography
							variant="h6"
							noWrap
							sx={{
								marginInline: 1,
								display: { xs: "flex", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".1rem",
								color: "white",
								textDecoration: "none",
							}}>
							Cat Gallery
						</Typography>
					</MenuItem>

					{/* for md and up, show the list of pages */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<MenuItem
								key={page}
								component={NavLink}
								to={"/" + page}
								onClick={handleCloseNavMenu}>
								<Button sx={{ my: 2, color: "white", display: "block" }}>
									{page}
								</Button>
							</MenuItem>
						))}
					</Box>
					<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								{avatarURL ? (
									<Avatar alt="user avatar" src={avatarURL} />
								) : (
									<Avatar alt="user avatar" src="/static/images/avatar/1.jpg" />
								)}
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									component={NavLink}
									to={"/" + setting}
									onClick={handleCloseUserMenu}>
									<Typography sx={{ textAlign: "center" }}>
										{setting}
									</Typography>
								</MenuItem>
							))}
							{user && (
								<MenuItem
									onClick={() => {
										localStorage.clear();
										window.location.reload();
										handleCloseUserMenu();
									}}>
									<Typography sx={{ textAlign: "center" }}>Logout</Typography>
								</MenuItem>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default NavBar;
