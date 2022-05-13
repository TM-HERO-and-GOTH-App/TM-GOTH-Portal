import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function AnnouncementCard(props) {
    const [moreText, setMoreText] = React.useState(false);
    const [showEditMenu, setShowEditMenu] = React.useState(null);
    let history = useHistory();

    const slides = [
        {
            city: 'Paris',
            country: 'France',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
            name: "Signe Mclean",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem tortor, at rutrum odio porta et. Quisque vel lectus tortor. Donec dignissim, metus nec venenatis mattis, augue justo dignissim mauris, at hendrerit ante tortor at nulla. Curabitur accumsan sem risus, sed eleifend metus malesuada nec. Donec vulputate, eros vitae rutrum rutrum, ex ante eleifend velit, quis pharetra felis nunc lacinia arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse accumsan dolor vitae dolor tincidunt, ut luctus justo semper. Cras a sollicitudin lectus, sit amet consequat ante. Ut vitae congue enim.'
        },
        {
            city: 'Singapore',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
            name: "Priscilla Hoffman",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem tortor, at rutrum odio porta et. Quisque vel lectus tortor. Donec dignissim, metus nec venenatis mattis, augue justo dignissim mauris, at hendrerit ante tortor at nulla. Curabitur accumsan sem risus, sed eleifend metus malesuada nec. Donec vulputate, eros vitae rutrum rutrum, ex ante eleifend velit, quis pharetra felis nunc lacinia arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse accumsan dolor vitae dolor tincidunt, ut luctus justo semper. Cras a sollicitudin lectus, sit amet consequat ante. Ut vitae congue enim.'
        },
        {
            city: 'Prague',
            country: 'Czech Republic',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
            name: "Hamilton Horne",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem tortor, at rutrum odio porta et. Quisque vel lectus tortor. Donec dignissim, metus nec venenatis mattis, augue justo dignissim mauris, at hendrerit ante tortor at nulla. Curabitur accumsan sem risus, sed eleifend metus malesuada nec. Donec vulputate, eros vitae rutrum rutrum, ex ante eleifend velit, quis pharetra felis nunc lacinia arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse accumsan dolor vitae dolor tincidunt, ut luctus justo semper. Cras a sollicitudin lectus, sit amet consequat ante. Ut vitae congue enim.'
        },
        {
            city: 'Amsterdam',
            country: 'Netherlands',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
            name: "Callie Knowles",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem tortor, at rutrum odio porta et. Quisque vel lectus tortor. Donec dignissim, metus nec venenatis mattis, augue justo dignissim mauris, at hendrerit ante tortor at nulla. Curabitur accumsan sem risus, sed eleifend metus malesuada nec. Donec vulputate, eros vitae rutrum rutrum, ex ante eleifend velit, quis pharetra felis nunc lacinia arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse accumsan dolor vitae dolor tincidunt, ut luctus justo semper. Cras a sollicitudin lectus, sit amet consequat ante. Ut vitae congue enim.'
        },
        {
            city: 'Moscow',
            country: 'Russia',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
            name: "Carlos Dejesus",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem tortor, at rutrum odio porta et. Quisque vel lectus tortor. Donec dignissim, metus nec venenatis mattis, augue justo dignissim mauris, at hendrerit ante tortor at nulla. Curabitur accumsan sem risus, sed eleifend metus malesuada nec. Donec vulputate, eros vitae rutrum rutrum, ex ante eleifend velit, quis pharetra felis nunc lacinia arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse accumsan dolor vitae dolor tincidunt, ut luctus justo semper. Cras a sollicitudin lectus, sit amet consequat ante. Ut vitae congue enim.'
        },
    ];

    return (
        <Grid container spacing={2}>
            {slides.map((data, index) => (
                <Card sx={{ width: '45%', margin: '10px 20px', height: '100%' }} md={6} className="row">
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon onClick={(e) => setShowEditMenu(e.currentTarget)} />
                            </IconButton>
                        }
                    />
                    <Menu
                        id="simple-menu"
                        anchorEl={showEditMenu}
                        open={Boolean(showEditMenu)}
                        onClose={() => setShowEditMenu(null)}
                    >
                        <Link to={`/edit_announcement_form/1`}>
                            <MenuItem>
                                Edit Announcement
                            </MenuItem>
                        </Link>
                    </Menu>
                    <CardMedia
                        component="img"
                        height="194"
                        image={data.img}
                    />
                    <CardContent>
                        <div>
                            <h3>
                                Some Title
                            </h3>
                        </div>
                        <div>
                            <p>
                                {moreText ? data.body : data.body.substring(0, 100) + '...'}
                            </p>
                            <div style={{ marginTop: "2.5%", display: "flex", flexDirection: "row-reverse" }}>
                                <h6>Publish by Editor's Name here</h6>
                            </div>
                            <a onClick={() => setMoreText(!moreText)}>{moreText ? "show less" : "show more"}</a>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Grid>
    );
}
