import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.page}>
      <Button variant="contained" color="primary">
        Clique Aqui
      </Button>
    </div>
  );
}
