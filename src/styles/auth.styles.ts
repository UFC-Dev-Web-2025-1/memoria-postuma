import { SxProps, Theme } from "@mui/material";

export const authStyles = {
  container: {
    minHeight: "100vh",
    bgcolor: "#8AABE0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,

  paper: {
    p: 6,
    width: 450,
    height: 550,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as SxProps<Theme>,

  title: {
    mb: 2,
  } as SxProps<Theme>,

  subtitle: {
    mb: 2,
  } as SxProps<Theme>,

  link: {
    color: "#3C68AE",
    fontWeight: 500,
    textDecoration: "none",
  } as SxProps<Theme>,

  textField: {
  } as SxProps<Theme>,

  primaryButton: {
    mt: 3,
    mb: 2,
    bgcolor: "#3C68AE",
    color: "#fff",
    boxShadow: 2,
    "&:hover": { bgcolor: "#3c68aeae" },
    width: 120,
    alignSelf: "center",
    fontWeight: 600,
    letterSpacing: 1,
  } as SxProps<Theme>,

  googleButton: {
    mt: 1,
    bgcolor: "#fff",
    color: "#666",
    border: "1px solid #dadce0",
    borderRadius: "25px",
    width: "100%",
    height: 45,
    fontWeight: 500,
    textTransform: "none",
    boxShadow: "0 1px 2px 0 rgba(60,64,67,.30)",
    "&:hover": {
      bgcolor: "#f8f9fa",
      boxShadow: "0 1px 3px 0 rgba(60,64,67,.30)",
      border: "1px solid #dadce0",
    },
  } as SxProps<Theme>,

  divider: {
    my: 2,
    width: "100%",
    color: "#666",
    fontSize: "14px",
  } as SxProps<Theme>,

  googleIcon: {
    mr: 1,
    width: 20,
    height: 20,
  } as SxProps<Theme>,
};
