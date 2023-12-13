import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import  About  from "../pages/About";
import Content from "../pages/Content";
import  Members  from "../pages/Members";

const Drawer = createDrawerNavigator();

function Navigator() {
    return (
      <Drawer.Navigator screenOptions={{ headerShown: true }}>
        <Drawer.Screen name="Dualar" component={Content} />
        <Drawer.Screen name="Hakkında" component={About} />
        <Drawer.Screen name="Reklamları Kaldır" component={Members} />
      </Drawer.Navigator>
    );
  }
  
  export default Navigator;