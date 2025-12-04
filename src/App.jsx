import { Button } from "antd";
import ReusableDrawer from "./components/drawer/ReusableDrawer";
import FormView from "./components/types/FormView";

const App = () => {
  return (
    <div className="p-4">
      <ReusableDrawer
        title="Upload Image"
        button={<Button type="primary">Open Form</Button>}
      >
        <FormView />
      </ReusableDrawer>
    </div>
  );
};

export default App;
