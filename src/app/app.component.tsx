import Groups from "@/components/groups/groups.component";

import "./app.styles.scss";

import classes from "./app.module.scss";

const App = () => {
  return (
    <div className={classes.container}>
      <Groups />
    </div>
  );
};

export default App;
