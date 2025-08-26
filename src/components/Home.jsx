import { Button } from "@mui/material";
import Form from "./Form";

export default function Home({ user, setUser, setAvatarURL }){
    return <>
        <section>
            <h2>Welcome to Cat Gallery!</h2>
            <p>Discover adorable cat images from around the world.</p>
            { user ? <>
            <p>Great to see you again {user}!</p>
            <Button 
                variant="outlined"
                color="primary"
                sx={{margin: '10px', backgroundColor: '#fff', ':hover': {backgroundColor: '#7886C7', color:'#2D336B'}}}
                onClick={()=>{ 
                    localStorage.clear();
                    setUser('');
                    setAvatarURL('')
                    }}>Clear my session</Button>
            </>
            :
            <Form setUser={setUser} setAvatarURL={setAvatarURL}></Form>}

        </section>
    </>
}
