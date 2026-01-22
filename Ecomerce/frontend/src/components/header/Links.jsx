import { ExpandMore, KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

const Links = ({ title }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        ":hover .show-when-hover": { display: "block" },
        ":hover": { cursor: "pointer" },
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">
        {t(title)}
      </Typography>

      <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />

      <Box
        className="show-when-hover"
        sx={{
          position: "absolute",
          top: "100%",
          minWidth: "170px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "none",
          zIndex: 2,
        }}
      >
        <Paper sx={{ mt: 2 }}>
          <nav>
            <List>
              <ListItem disablePadding>
                <ListItemButton sx={{ p: 0, px: 1.5 }}>
                  <ListItemText
                    primary={t("links.dashboard")}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 300,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                sx={{
                  ":hover .sub-link": { display: "block" },
                  position: "relative",
                }}
              >
                <ListItemButton sx={{ p: 0, px: 1.5 }}>
                  <ListItemText
                    primary={t("links.products")}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 300,
                      },
                    }}
                  />
                  <Box flexGrow={1} />
                  <KeyboardArrowRightOutlined fontSize="small" />
                </ListItemButton>

                <Box
                  className="sub-link"
                  sx={{
                    display: "none",
                    position: "absolute",
                    top: 0,
                    left: "100%",
                  }}
                >
                  <Paper sx={{ ml: 1, minWidth: 150 }}>
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={t("links.trash")} />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={t("links.spam")} />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Paper>
                </Box>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton sx={{ p: 0, px: 1.5 }}>
                  <ListItemText
                    primary={t("links.orders")}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 300,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton sx={{ p: 0, px: 1.5 }}>
                  <ListItemText
                    primary={t("links.profile")}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 300,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Paper>
      </Box>
    </Box>
  );
};

export default Links;