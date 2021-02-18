import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import Title from "../../../shared/Title"
import {APILink, Name} from "../../../shared/config"

import styles from "../../../assets/admin/jss/material-dashboard-react/views/dashboardStyle.js";
import "../../../assets/admin/css/admin.css";
import CardBody from "../components/Card/CardBody.js";
import { TableHead, Table, TableRow, TableCell, TableBody } from "@material-ui/core";
import axios from "axios";
import 'toastr/build/toastr.min.css'
import Pagination from "react-js-pagination";
import { chunk } from "../../../shared/SharedFunctions.js";

const useStyles = makeStyles(styles);

const FetchOwner = ({id}) => {
    const [owners,setOwners] = React.useState('');

    React.useState(()=>{
        axios.post(`${APILink}/owner/profile`,{id:id})
        .then(res => {
            if(res.data.status==="SUCCESS"){
                setOwners(res.data.owner.name)
            }
            else{
                setOwners("Owner does not exist")
            }
        })
    },[id]);
    return owners;
}


export default function Brands() {
    const [brands,setBrands] = React.useState("");
    const [total,setTotal] = React.useState(0);
    const [current_page,setCurrentPage] = React.useState(1);
    const fetchBrands = () => {
      axios.post(`${APILink}/admin/brands`)
      .then(res => {
          if(res.data.brands.length===0){
              setBrands(null);
          }
          else{
              const m = chunk(res.data.brands,10);
              setTotal(res.data.brands.length);
              setBrands(m);
          }
      });
    }
    React.useEffect(fetchBrands,[]);
  
    const classes = useStyles();
    return (
      <div>
          <Title title={`${Name} | Admin | Brands`} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                      <h3 className={`${classes.cardTitle} text-light`}>
                          Brands
                      </h3>
                      <p className={`${classes.cardCategory} text-light`}>All Brands</p>
                  </CardHeader>
                  <CardBody>
                      <Table>
                          <TableHead className="text-primary">
                              <TableRow>
                                  <TableCell>
                                      ID
                                  </TableCell>
                                  <TableCell>
                                      Name
                                  </TableCell>
                                  <TableCell>
                                      Created By
                                  </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {brands!==""?(brands!==null)?
                                  brands[current_page-1].map((brand,key) => {
                                      return(
                                          <TableRow key={key}>
                                              <TableCell>
                                                  {key+1}
                                              </TableCell>
                                              <TableCell>
                                                  {brand.name}
                                              </TableCell>
                                              <TableCell>
                                                  <FetchOwner id={brand.owner_id}/>
                                              </TableCell>
                                          </TableRow>
                                      );
                                  }) 
                              :"No data":"Fetching data"
                          }
                          </TableBody>
                      </Table>
                      {brands!==null?
                          <Pagination
                              hideDisabled
                              activePage={current_page}
                              itemsCountPerPage={10}
                              totalItemsCount={total}
                              pageRangeDisplayed={10}
                              onChange={(e) => setCurrentPage(e)}
                              itemClass="page-item mt-2"
                              linkClass="page-link"
                          />
                          :''
                      }
                  </CardBody>
              </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
}
