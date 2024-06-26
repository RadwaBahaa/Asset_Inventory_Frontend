import MessageSubNavbar from "../../Components/Messages/MessageSubNavbar"
import React, { useEffect, useState } from "react";
import Contrillers from "../../Components/Messages/Controllers"
export default function Messages() {
  return (
    <div>
      <MessageSubNavbar
        title="Messages"
      />
      <Contrillers 
      />
      
    </div>
  );
}
