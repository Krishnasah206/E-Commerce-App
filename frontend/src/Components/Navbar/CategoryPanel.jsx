import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';

const CategoryPanel = (props) => {

  const toggleDrawer = (newOpen) => () => {
    props.openCatPanel(newOpen);
  };


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-4 text-[18px] font-semibold text-gray-800 border-b flex items-center justify-between">
        Shop By Categories
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[22px] text-gray-600 hover:text-red-500 transition"
        />
      </h3>


      <CategoryCollapse />
    </Box>
  );

  return (
    <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;
