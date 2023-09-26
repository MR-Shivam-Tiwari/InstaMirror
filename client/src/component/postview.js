import React, { useEffect, useState } from "react";
import "./css/Postview.css";
import Avatar from "@mui/joy/Avatar";
import LogoutIcon from '@mui/icons-material/Logout';
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

import Sheet from "@mui/joy/Sheet";
import Chip from "@mui/joy/Chip";
// import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';

import { useNavigate, useParams } from "react-router-dom";
import Addpost from "./form";
import { useName } from "./NameContext";

export default function Daa() {
  const [open, setOpen] = React.useState(false);
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [color, setColor] = React.useState("primary");
  const { name } = useName();
  const gotoform = () => {
    nav("/form");
  };
const Logout = ()=>{
  nav("/")
}
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/post");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUsers();
    
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    width: '30%',
    marginTop: '10%',
  };

  if (width <= 768) {
    styles.width = '100%';
  }

  return (
    <>
      <Sheet
        variant="solid"
        color={color}
        invertedColors
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          p: 2,
          width: "100%",
          borderRadius: { xs: 0, sm: "sm" },
          minWidth: "min-content",
          ...(color !== "warning" && {
            background: (theme) =>
              `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
          }),
        }}
      >
        <IconButton
          variant="soft"
          size="sm"
          onClick={() => {
            const colors = [
              "primary",
              "neutral",
              "danger",
              "success",
              "warning",
            ];

            const nextColor = colors.indexOf(color);
            setColor(colors[nextColor + 1] ?? colors[0]);
          }}
          sx={{ borderRadius: "50%" }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://img.freepik.com/free-photo/young-man-beach_23-2147645586.jpg?w=360&t=st=1695726087~exp=1695726687~hmac=5ddad35ec3b027b6058ac12163c0a804208ebc98126d83a40821a380f87be571"
          />
          {/* <ColorLensRoundedIcon fontSize="small" /> */}
        </IconButton>
        <Box sx={{ flex: 1, display: "flex", gap: 1, px: 2 }}>
          <Chip
            variant="outlined"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {name}
          </Chip>
        </Box>
        <Button
          variant="outlined"
          color="neutral"
          className="me-2 bg-light"
          startDecorator={<CameraAltIcon />}
          onClick={gotoform}
        >
          Photo Upload
        </Button>

        <Box sx={{ display: "flex", flexShrink: 0, gap: 2 }}>
        <Button
          variant="outlined"
          color="neutral"
          className="me-2 bg-light"
          startDecorator={<LogoutIcon />}
          onClick={Logout}
        > Logout
        </Button>

         
        </Box>
      </Sheet>

      {users.map((Elem) => (
        <div key={Elem.id} id="lastcontainer">
          {" "}
          {/* Assuming there is an 'id' field in each 'Elem' */}
          <Card
            variant="outlined"
            className="rounded-3 mt-2 mb-2 "
            style={styles}
            // sx={{
            
            //   minWidth: 500,
            //   "--Card-radius": (theme) => theme.vars.radius.xs,
            // }}
          >
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", gap: 1 }}
              className="p-2"
            >
              <Box
                sx={{
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    m: "-2px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  },
                }}
              >
                <Avatar
                  size="sm"
                  src="https://img.freepik.com/free-photo/young-man-beach_23-2147645586.jpg?w=360&t=st=1695726087~exp=1695726687~hmac=5ddad35ec3b027b6058ac12163c0a804208ebc98126d83a40821a380f87be571"
                  sx={{
                    // p: 0.5,
                    border: "2px solid",
                    borderColor: "background.body",
                  }}
                />
              </Box>
              <div>
                <p className="fs-19 fw-bold mb-0 mt-3">{Elem.author}</p>{" "}
                <p className="mt-0" style={{fontSize:"13px"}}>{Elem.location}</p>
              </div>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
              >
                <MoreHoriz />
              </IconButton>
            </CardContent>
            <CardOverflow>
              <AspectRatio>
                <img src={`/uploads/${Elem.image}`} alt="" loading="lazy"  />
              </AspectRatio>
            </CardOverflow>
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", mx: -1 }}
            >
              <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                <IconButton variant="plain" color="neutral" size="sm">
                  <FavoriteBorder />
                </IconButton>
                <IconButton variant="plain" color="neutral" size="sm">
                  <ModeCommentOutlined />
                </IconButton>
                <IconButton variant="plain" color="neutral" size="sm">
                  <SendOutlined />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mx: "auto",
                }}
              >
               
              </Box>
              <Box
                sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
              >
                <IconButton variant="plain" color="neutral" size="sm">
                  <BookmarkBorderRoundedIcon />
                </IconButton>
              </Box>
            </CardContent>
            <CardContent>
            
              <Typography fontSize="sm">
                <Link
                  component="button"
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  {Elem.author}
                </Link>{" "}
                {Elem.description}
              </Typography>

              <Link
                component="button"
                underline="none"
                fontSize="10px"
                sx={{ color: "text.tertiary", my: 0.5 }}
              >
                {/* 2 DAYS AGO */}
              </Link>
            </CardContent>
           
          </Card>
          {/* <div className="post">
            <div className="first">
              <div className="infirst">
                <div></div>
                <p className="upperpara">
                  <b>{Elem.author}</b>
                </p>
                <p className="upperpara2">{Elem.location}</p>
              </div>
              <img id="p3" src={dot} alt="avataar"></img>
            </div>
            <div className="midp">
              <img id="p2" src={`/uploads/${Elem.image}`} alt="avataar"></img>
            </div>
            <div className="thirdline">
              <div className="inthirdline">
                <div>
                  <i className="fa fa-heart" />
                </div>
                <div>
                  <i className="fa fa-paper-plane" />
                </div>
                <div>{Elem.date}</div>
              </div>
              <div>{Elem.likes}</div>
            </div>
            <div className="lastline">
              <b>{Elem.description}</b>
            </div>
          </div> */}
        </div>
      ))}
    </>
  );
}
