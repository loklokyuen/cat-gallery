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
								<NavLink key={page} to={"/" + page}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography sx={{ textAlign: "center" }}>{page}</Typography>
									</MenuItem>
								</NavLink>
							))}
						</Menu>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}>
						<i className="fa-solid fa-cat"></i>
					</Box>
					<NavLink to={"/"}>
						<Typography
							variant="h6"
							noWrap
							component="a"
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
					</NavLink>

					{/* for md and up, show the list of pages */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<NavLink key={page} to={"/" + page}>
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}>
									{page}
								</Button>
							</NavLink>
						))}
					</Box>
					<Box sx={{ flexGrow: 1, justifyItems: "flex-end" }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ right: 0, justifySelf: "flex-end" }}>
								{avatarURL ? (
									<img src={avatarURL} alt="avatar" />
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
								<NavLink key={setting} to={"/" + setting.toLowerCase()}>
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography sx={{ textAlign: "center" }}>
											{setting}
										</Typography>
									</MenuItem>
								</NavLink>
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
