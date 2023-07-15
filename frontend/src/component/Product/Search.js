import React, { useState, Fragment,useEffect } from "react";
import {Button, Drawer,HStack, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, VStack, useDisclosure} from "@chakra-ui/react"
import { ChakraProvider, theme } from '@chakra-ui/react';

import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import {Link} from "react-router-dom"

import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");



//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//                 <Link to={`/products/${keyword}`}>M</Link>
  
//     } else {
//            <Link to={`/products`}></Link>

//     }
//   };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" >
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
  <ChakraProvider theme={theme}>

         <Button
                // variant={'ghost'}
                colorScheme={'blue'}
              >
                <Link to={`/products/${keyword}`}>Search</Link>
              </Button>
              </ChakraProvider>
      </form>
    </Fragment>
  );
};

export default Search;
