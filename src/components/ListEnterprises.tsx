import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import BusinessNiantic from './static/images/business-niantic.png';
import BusinessInstacart from './static/images/business-instacart.png';
import BusinessTwitch from './static/images/business-twitch.png';

import IconGroup from './static/images/icon-group.png';
import DoneIcon from '@mui/icons-material/Done';

import InvestorAircnc from './static/images/investor-aircnc.png';
import InvestorStripe from './static/images/investor-stripe.png';
import InvestorYelp from './static/images/investor-yelp.png';

import { IconGroupSVG } from "./static/icons/IconGroupSVG";
import CardMedia from '@mui/material/CardMedia';

import Avatar from '@mui/material/Avatar';

export default function ListEnterprises() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h5" component="h2" textAlign={"left"} sx={{ paddingTop: 4, paddingBottom: 4 }}>
                        Vagas agrupadas por empresas
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Grid container spacing={2}>
                                    <Grid xs={1}
                                        sx={{ padding: 2 }}>
                                        <Box>
                                            <img
                                                src={BusinessNiantic}
                                                alt="Business Niantic"
                                                width="46"
                                                height="45"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs={11} textAlign={"left"}>
                                        <Typography variant="h5" gutterBottom>
                                            Niantic
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            Building technologies and ideas that move us as the leaders in Augmented Reality
                                        </Typography>
                                        <Typography variant="h6" gutterBottom
                                            sx={{ color: '#DCE0DD' }}>  
                                            <Chip
                                                avatar={<IconGroupSVG
                                                    sx={{
                                                        height: 24,
                                                        width: 24,
                                                    }}
                                                />}
                                                label="501-1000 EMPOLOYEES" 
                                                sx={{
                                                    color: '#7B91B1',
                                                    backgroundColor: 'white'
                                                }}
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Stack direction="row" spacing={1}>
                                    <Chip
                                        avatar={<Avatar
                                            sx={{
                                                backgroundColor: 'green'
                                            }}><DoneIcon
                                                sx={{
                                                    color: 'white',
                                                    fontSize: "small"
                                                }} /></Avatar>}
                                        label="ACTIVELY HIRING"
                                        variant="outlined"
                                        sx={{
                                            color: '#005A37',
                                            backgroundColor: '#E1FAF3'
                                        }}
                                    />
                                    <Chip
                                        avatar={<Avatar
                                            alt="Aircnc"
                                            variant="rounded"
                                            src={InvestorAircnc} />}
                                        label="SAME INVESTOR AS AIRCNC"
                                        variant="outlined"
                                        sx={{
                                            color: '#005A37',
                                            backgroundColor: '#E1FAF3'
                                        }}
                                    />
                                </Stack>
                                <List dense={dense}>
                                    <ListItem
                                        sx={{ border: 1, borderColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Senior Game Designer - Pokemon Go San Francisco"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }} >today</Typography>
                                        <Button variant="contained"
                                            sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained"
                                            sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                    <ListItem
                                        sx={{ border: 1, borderColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Software Engineer - Web/Fullstack San Francisco"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }}>4 weeks ago</Typography>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                    <ListItem
                                        sx={{ backgroundColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Software Engineer - Server/Backend Seatle"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }}>1 month ago</Typography>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                </List>
                            </Paper>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop: 2 }} >
                                <Grid container spacing={2}>
                                    <Grid xs={1}
                                        sx={{ padding: 2 }}>
                                        <Box>
                                            <img src={BusinessInstacart} alt="Business Instacart" width="46" height="45" />
                                        </Box>
                                    </Grid>
                                    <Grid xs={11} textAlign={"left"}>
                                        <Typography variant="h5" gutterBottom>
                                            Instacart
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            Our mission is to create a world where everyone has access to the food they love and more
                                        </Typography>
                                        <Typography variant="h6" gutterBottom
                                            sx={{ color: '#DCE0DD' }}>
                                            <Chip
                                                avatar={<IconGroupSVG
                                                    sx={{
                                                        height: 24,
                                                        width: 24,
                                                    }}
                                                />}
                                                label="1001-5000 EMPOLOYEES" 
                                                sx={{
                                                    color: '#7B91B1',
                                                    backgroundColor: 'white'
                                                }}
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Stack direction="row" spacing={1}>
                                    <Chip
                                        avatar={<Avatar
                                            sx={{
                                                backgroundColor: 'green'
                                            }}><DoneIcon
                                                sx={{
                                                    color: 'white',
                                                    fontSize: "small"
                                                }} /></Avatar>}
                                        label="ACTIVELY HIRING"
                                        variant="outlined"
                                        sx={{
                                            color: '#005A37',
                                            backgroundColor: '#E1FAF3'
                                        }}
                                    />
                                    <Chip
                                        avatar={<Avatar
                                            alt="Aircnc"
                                            src={InvestorStripe}
                                            variant="rounded" />}
                                        label="SAME INVESTOR AS STRIPE"
                                        variant="outlined"
                                        sx={{
                                            color: '#005A37',
                                            backgroundColor: '#E1FAF3'
                                        }}
                                    />
                                </Stack>
                                <List dense={dense}>
                                    <ListItem
                                        sx={{ border: 1, borderColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Senior Software Engineer - San Francisco - $130k – $170k • 0.003% – 0.027%"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }} >today</Typography>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                    <ListItem
                                        sx={{ border: 1, borderColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Senior Android Engineer - San Francisco - $130k – $170k • 0.003% – 0.027%"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }}>4 weeks ago</Typography>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                    <ListItem
                                        sx={{ backgroundColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Senior iOS Engineer - San Francisco - $130k – $170k • 0.003% – 0.027%"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }}>1 month ago</Typography>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                </List>
                            </Paper>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop: 2 }} >
                                <Grid container spacing={2}>
                                    <Grid xs={1}
                                        sx={{ padding: 2 }}>
                                        <Box>
                                            <img src={BusinessTwitch} alt="Business Twitch" width="46" height="45" />
                                        </Box>
                                    </Grid>
                                    <Grid xs={11} textAlign={"left"}>
                                        <Typography variant="h5" gutterBottom>
                                            Twitch
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            Come together live every day to chat, interact, and make entertainment together
                                        </Typography>
                                        <Typography variant="h6" gutterBottom
                                            sx={{ color: '#DCE0DD' }}>
                                            <Chip
                                                avatar={<IconGroupSVG
                                                    sx={{
                                                        height: 24,
                                                        width: 24,
                                                    }}
                                                />}
                                                label="1001-5000 EMPOLOYEES" 
                                                sx={{
                                                    color: '#7B91B1',
                                                    backgroundColor: 'white'
                                                }}
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Stack direction="row" spacing={1}>
                                    <Chip
                                        avatar={<Avatar
                                            sx={{
                                                backgroundColor: 'green'
                                            }}><DoneIcon
                                                sx={{
                                                    color: 'white',
                                                    fontSize: "small"
                                                }} /></Avatar>}
                                        label="ACTIVELY HIRING"
                                        variant="outlined"
                                        sx={{
                                            color: '#005A37',
                                            backgroundColor: '#E1FAF3'
                                        }}
                                    />
                                    <Chip
                                        avatar={<Avatar
                                            alt="Aircnc"
                                            src={InvestorYelp}
                                            variant="rounded" />}
                                        label="SAME INVESTOR AS YELP"
                                        variant="outlined"
                                        sx={{
                                            color: '#005A37',
                                            backgroundColor: '#E1FAF3'
                                        }}
                                    />
                                </Stack>
                                <List dense={dense}>
                                    <ListItem
                                        sx={{ border: 1, borderColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Software Architect Subs - Seattle • San Francisco / Remote possible - $240k – $320k • 0.0% – 0.001%"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }} >today</Typography>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                    <ListItem
                                        sx={{ border: 1, borderColor: '#DCE0DD' }}>
                                        <ListItemText
                                            primary="Applied Scientist Lead - Twitch Commerce - Seattle • San Francisco • Remote possible - $240k – $320k •"
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <Typography component="p" sx={{ marginLeft: 2 }}>4 weeks ago</Typography>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Save</Button>
                                        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: "#C0C0C0", color: "#050C26" }}>Apply</Button>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}