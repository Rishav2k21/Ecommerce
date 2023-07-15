import {Button, Drawer,HStack, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, VStack, useDisclosure,InputGroup,InputRightElement,Input,InputRightAddon,InputLeftElement} from "@chakra-ui/react"
import React, { useState, Fragment,useEffect } from "react";

import {BiMenuAltLeft} from"react-icons/bi"
import {Link} from "react-router-dom"
// import { Search2Icon } from "@chakra-ui/icons";
const Header = () => {
    const {isOpen ,onOpen,onClose}=useDisclosure();
     const [keyword, setKeyword] = useState("");
  return (
    <>
     
      <Button 
  colorScheme='gray'
  zIndex={'overlay'}
  top={'4'}
  left={'4'}
  pos={'fixed'}
  w={'10'}
  h={'10'}
  borderRadius={'full'}
  onClick={onOpen}
   >
    <BiMenuAltLeft size={20}/>
  </Button>




  <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
    <DrawerOverlay/>
    <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader>E-COMMERCE</DrawerHeader>
        <DrawerBody>
<VStack alignItems={'flex-start'}>
<Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'blue'}
              >
            
                <Link to={'/'}>Home</Link>
              </Button>
              <Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'blue'}
              >
                <Link to={'/products'}>Products</Link>
              </Button>

              

              <Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'blue'}
              >
                <Link to={'/contact'}>Contact</Link>
              </Button>
               <Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'blue'}
              >
                <Link to={'/about'}>About</Link>
              </Button>
               <Button
                onClick={onClose}
                variant={'ghost'}
                colorScheme={'blue'}
              >
                <Link to={'/search'}>Search</Link>
              </Button>
            </VStack>
            
            <HStack
              pos={'absolute'}
              bottom={'10'}
              left={'0'}
              w={'full'}
              justifyContent={'space-evenly'}
            >
              <Button onClick={onClose} colorScheme={'blue'}>
                <Link to={'/login'}>Log In</Link>
              </Button>
              <Button
                onClick={onClose}
                colorScheme={'blue'}
                variant={'outline'}
              >
                <Link to={'/login'}>Sign Up</Link>
              </Button>
            </HStack>

        </DrawerBody>
    </DrawerContent>
  </Drawer>
   

    </>
  )
}


export default Header
// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";
// import "../Header/Header.css"
// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

// const Header = () => {
//   return <ReactNavbar {...options} />;
// };

// export default Header;

