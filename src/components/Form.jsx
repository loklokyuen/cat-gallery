import { Autocomplete, Avatar, Box, Button, Card, MenuItem, Stack, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { NavLink } from "react-router";

export default function Form({ setUser, setAvatarURL }){
    const [username, setUsername] = useState('')
    const [avatarLink, setAvatarLink] = useState('')

    const [catLikingLevel, setCatLikingLevel] = useState('')
    const [currentTab, setCurrentTab] = useState("1")

    const catLikingOptions = ["Very much", "Okay", "Meh.."]


    function handleSubmitForm(){
        localStorage.setItem("user", username)
        localStorage.setItem("avatarURL", avatarLink)
        setAvatarURL(avatarLink)
        setUser(username)
    }
    function handleTabChange(e, newValue){
        setCurrentTab(newValue);
    }
    return (
        <Card>
            <Tabs defaultValue={1} value={currentTab} onChange={handleTabChange} aria-label="tabs of signing in or as a guest" textColor="primary">
                <Tab label="Sign Up with a Username" value="1" />
                <Tab label="Continue as Guest" value="2" />
            </Tabs>

        <TabContext value={currentTab}>
        <TabPanel value="1">
            <Stack alignItems={"center"} >
                <TextField
                    fullWidth
                    margin="dense"
                    label="Username"
                    variant="outlined"
                    helperText="Try to make it unique!"
                    sx={{ width: 250, minHeight: 50 }}
                    value={username}
                    onChange={(e)=>{ setUsername(e.target.value)}}
                ></TextField>
                <TextField 
                    select
                    label="How much do you like cats?" 
                    value={catLikingLevel} 
                    onChange={(e) => setCatLikingLevel(e.target.value)}
                    fullWidth
                    sx={{ width: 250, minHeight: 50 }} // Adjusted size
                >
                    <MenuItem sx={{ fontSize: "1.2rem", padding: "12px 20px" }} value={"Very much!"}>Very much!</MenuItem>
                    <MenuItem sx={{ fontSize: "1.2rem", padding: "12px 20px" }} value={"Okay"}>Okay</MenuItem>
                    <MenuItem sx={{ fontSize: "1.2rem", padding: "12px 20px" }} value={"Meh.."}>Meh..</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Avatar URL"
                    variant="outlined"
                    helperText="Or pick one in the gallery later!"
                    sx={{ width: 250, minHeight: 50 }}
                    value={avatarLink}
                    onChange={(e)=>{ setAvatarLink(e.target.value)}}
                ></TextField>
                <Button variant="contained" color="primary" onClick={handleSubmitForm}
                    sx={{margin: '10px', ':hover': {backgroundColor: '#A9B5DF'}}}>
                    Submit
                    </Button>
            </Stack>

        </TabPanel>
        <TabPanel value="2">
            <p>You don't need an account to browse cat photos! Simply go to the gallery.</p>
            <NavLink to="/Gallery">
                <Button variant="contained" color="primary" sx={{margin: '10px', ':hover': {backgroundColor: '#A9B5DF'}}}>
                Start exploring now!
                </Button>
            </NavLink>
        </TabPanel>
        </TabContext>
    </Card>)
}