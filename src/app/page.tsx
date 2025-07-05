"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import LoginPage from "./login/page";
import Explore from "./explore/page";
import theme from "./theme";

export default function Home() {
  return (
    <>
      <Explore />
    </>
  );
}
