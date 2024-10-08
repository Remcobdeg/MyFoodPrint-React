import React, {useEffect, useState, useContext, useCallback} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { AuthContext } from '../../shared/context/authContext';
import {useHttpClient} from '../../shared/hooks/http-hook';
import AlternativesTable from '../components/AltTable';
import { useLocation } from 'react-router-dom';
import HelpPages from '../../shared/components/HelpPages';
import { StyledHeader } from '../../shared/MuiStyledComponents/MuiStyledComponents';
import colorLegend from '../../img/color_legend.png';
import lowerLegend from '../../img/lower_higher_legend.png';
import Container from '@mui/material/Container';
import { trackEvent } from '../../shared/modules/googleAnalyticsModules';

import './Alternatives.css';
import { Box, Grid, Typography } from '@mui/material';

function Alternatives() {

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();

  const { state } = useLocation();

  const [product, setProduct] = useState('');
  const [productName, setProductName] = useState(!!state ? state : '');
  const [productHierarchy, setProductHierarchy] = useState();
  const [alternatives, setAlternatives] = useState([{}]);
  const [subgroupAlternatives, setSubgroupAlternatives] = useState();
  const [maxFootprint, setMaxFootprint] = useState(0);

  const stuctureData = useCallback((alternatives, product) => {
    const selectedProduct = alternatives.find(alternative => alternative.product === product);



    //get all items in that subgroup
    let subGroup = alternatives.filter(alternative => alternative.subgroup === selectedProduct.subgroup);
    let group = alternatives.filter(alternative => alternative.group === selectedProduct.group);
    // don't show the products already listed in the subgroup list
    group = group.filter(alternative => !subGroup.includes(alternative));
    // but do include the selected product in the group list
    group = [...group, selectedProduct]

    subGroup = stuctureData2(subGroup,selectedProduct);
    group = stuctureData2(group,selectedProduct);

    return({subgroupAlternatives: subGroup, groupAlternatives: group});

  },[state])

  const stuctureData2 = (alternatives,selectedProduct) => {

    alternatives.forEach(d => {
      d.lower = Math.round((1-d.footprint_g_100g/selectedProduct.footprint_g_100g)*100);
    });

    alternatives.forEach(d => {
      if (d.footprint_g_100g < 300) {
          return(d.color = "#B2EA70")
      } else if (d.footprint_g_100g < 600) {
          return(d.color = "#FBD148")
      } else if (d.footprint_g_100g < 1000) {
          return(d.color = "#F9975D")
      } else {
          return(d.color = "#C85C5C")
      }
    });

    //sort alternatives ascending by footprint value
    alternatives.sort((a,b) => a.footprint_g_100g-b.footprint_g_100g)

    //rename properties for use in data presentation
    alternatives = alternatives.map(alternative => {return({text: alternative.product, value: alternative.footprint_g_100g, color: alternative.color, lower: alternative.lower})});

    return(alternatives);
  }

  const handleChange = (event) => {
    event.stopPropagation();
    trackEvent("Alternatives", "Select alternative product from dropdown", event.target.value);
    setProduct(alternatives.find(alternative => alternative.product === event.target.value));
    setProductName(event.target.value);
    setSubgroupAlternatives(() => {
      const answer = stuctureData(alternatives,event.target.value)
      return(answer)
    });  
  };

  // get products
  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const responseData = await sendRequest(
          "/alternatives/",
          'get',
          {},
          {
            "Content-type": "application/json",
            Authorization: 'Bearer ' + auth.token
          }
        )
        let response = responseData.data.alternatives;
        response.forEach(alternative => alternative.product = alternative.product.toLowerCase());
        response.forEach(alternative => alternative.group = alternative.group.toLowerCase());
        response.forEach(alternative => alternative.subgroup = alternative.subgroup.toLowerCase());
        response = (response.sort((a,b) => {if(b.product > a.product){return(-1)}else{return(1)};}));
        const productList = [...new Set(response.map(alternative => alternative.product))].sort();
        const subgroupList = [...new Set(response.map(alternative => alternative.subgroup))].sort();
        const groupList = [...new Set(response.map(alternative => alternative.group))].sort();
        const productHierarchy = {productList:productList,subgroupList:subgroupList,groupList:groupList};
        setProductHierarchy(productHierarchy);
        setAlternatives(response);

        setMaxFootprint(Math.max(...response.map(alternative => alternative.footprint_g_100g)));

        // if(!!state){
        //   console.log(state === "beef");
        //   setProduct(alternatives.find(alternative => alternative.product === state));
        //   console.log(product);
        //   setProductName(state);
        // }
      } catch (err) {
        trackEvent("Alternatives", "Error fetching alternatives", err);
      }
    };
    fetchProducts(); 
  }, [auth.token,sendRequest,state])

  useEffect(() => {
    if(!!state && Object.keys(alternatives[0]).length !== 0){
      setProduct(alternatives.find(alternative => alternative.product === state));
      setProductName(state);
      setSubgroupAlternatives(() => {
        const answer = stuctureData(alternatives,state)
        return(answer)
      }); 
    }
  },[state,alternatives,stuctureData])

  return (
    <Container maxWidth="sm" sx={{px: "1em", pb: "64px"}} >
      <StyledHeader variant="h4">Alternatives</StyledHeader> 
      {!isLoading && productHierarchy && <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Selected product</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={productName}
          onChange={handleChange}
          label="Product"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {productHierarchy.groupList.map((groupName, groupIndex) => 
            {return(
                [       
                  <ListSubheader key={groupIndex}>{groupName}</ListSubheader>,
                  [...new Set(alternatives.filter(alternative => alternative.group === groupName).map(alternative => alternative.subgroup))]
                  .map((subgroupName,subgroupIndex) => 
                    {return(
                      [<ListSubheader key={subgroupIndex} sx={{pl: 4}} >{subgroupName}</ListSubheader>,
                      alternatives.filter(alternative => alternative.subgroup === subgroupName)
                      .map(
                      (alternative,index) => <MenuItem sx={{pl: 6}} key={alternative.id} value={alternative.product}>{alternative.product}</MenuItem>
                      )]
                    )}
                  )              
                ]
            )} 
          )}
        </Select>
      </FormControl>}
      {/* overview of current consumption of the product for selected time range. potentially only if you got here through clicking on an item. otherwise not */}
      {/* {barchart of alternatives from the same subgroup} */}
      {!!subgroupAlternatives && <Card sx={{mt: 3, mb:3}}>
        <CardHeader 
          title={`${product.subgroup} alternatives`} 
          titleTypographyProps={{ align: 'center' }}
          sx={{color:"#FFFFFF", backgroundColor: "#91C788", padding:"4px"}}
        />  
        <AlternativesTable data={subgroupAlternatives.subgroupAlternatives} product={product}  maxFootprint={maxFootprint}/>
      </Card>}
      {!!subgroupAlternatives && <Card sx={{mt: 3, mb:3}}>
        <CardHeader 
          title={`${product.group} alternatives`} 
          titleTypographyProps={{ align: 'center' }}
          sx={{color:"#FFFFFF", backgroundColor: "#91C788", padding:"4px"}}
        />  
        <AlternativesTable data={subgroupAlternatives.groupAlternatives} product={product} maxFootprint={maxFootprint}/>
      </Card>}

      {!!subgroupAlternatives && <Container sx={{justifyContent: "center", textAlign: "center", mt: 3, mb: 3}}>
        <Typography variant="overline" sx={{color: '#9E9E9E'}}>Legend</Typography>
        <Grid container  justifyContent="center" alignItems="flex-start" >
          <Grid item xs={6}>
            <img src={colorLegend} alt="legend" className="centerImage"/>  
          </Grid>
          <Grid item xs={6}>
            <img src={lowerLegend} alt="legend" className="centerImage"/>
          </Grid>
        </Grid>
      </Container>}

             

      {product === "" && <Typography align = "center" sx={{mt: 10, color: "rgba(0, 0, 0, 0.6)"}} variant="h6">Select a product to see alternatives</Typography>}
      <HelpPages fromPage={"Alternatives"}/>
    </Container>
  );
}

export default Alternatives;
