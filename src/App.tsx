import React from "react";
import Button from '@mui/material/Button';
import styles from'./app.module.scss'

const App: React.FC = () => {
  return (
      <div className={styles.wrapper}>
         Hello, this is my React app.
         <Button className={styles.button} variant="contained">Hello World</Button>
      </div>
  )
}
export default App;
