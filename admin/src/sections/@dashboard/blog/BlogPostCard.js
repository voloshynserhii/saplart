import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Card,
  Avatar,
  Typography,
  CardContent,
} from "@mui/material";

import { fDate } from "../../../utils/formatTime";

import SvgColor from "../../../components/svg-color";
import Iconify from "../../../components/iconify";
// import { url } from "../../../utils/consts";

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "35px",
});

const StyledTitle = styled(Link)({
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  color: theme.palette.text.disabled,
}));

export default function BlogPostCard({ event }) {
  const { title, action, createdAt, creator } = event;

  let actionText;
  if (action === "documentUpdate") actionText = "Document was updated";
  if (action === "documentCreate") actionText = "Document was created";

  return (
      <Card sx={{ position: "relative" }}>
        <StyledCardMedia>
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
            }}
          />
          <StyledAvatar alt={creator.name} src={creator.avatarUrl || ""} />
        </StyledCardMedia>

        <CardContent>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {fDate(createdAt)}
          </Typography>

          <StyledTitle color="inherit" variant="subtitle2" underline="hover">
            {title}
          </StyledTitle>

          <StyledInfo>
            <Box>
              <Iconify
                // icon={info.icon}
                sx={{ width: 16, height: 16, mr: 0.5 }}
              />
              <Typography variant="caption">{actionText}</Typography>
            </Box>
          </StyledInfo>
        </CardContent>
      </Card>
  );
}
