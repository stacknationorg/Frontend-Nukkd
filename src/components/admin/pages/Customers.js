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


export default function Customers() {
    const [customers,setCustomers] = React.useState("");
    const [total,setTotal] = React.useState(0);
    const [current_page,setCurrentPage] = React.useState(1);
    const fetchCustomers = () => {
      axios.post(`${APILink}/admin/customers`)
      .then(res => {
          if(res.data.customers.length===0){
              setCustomers(null);
          }
          else{
              const m = chunk(res.data.customers,10);
              setTotal(res.data.customers.length);
              setCustomers(m);
          }
      });
    }
    React.useEffect(fetchCustomers,[]);
  
    const classes = useStyles();
    return (
      <div>
          <Title title={`${Name} | Admin | Customers`} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                      <h3 className={`${classes.cardTitle} text-light`}>
                          Customers
                      </h3>
                      <p className={`${classes.cardCategory} text-light`}>Approved Customers</p>
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
                                      Email
                                  </TableCell>
                                  <TableCell>
                                      Mobile
                                  </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {customers!==""?(customers!==null)?
                                  customers[current_page-1].map((customer,key) => {
                                      return(
                                          <TableRow key={key}>
                                              <TableCell>
                                                  {key+1}
                                              </TableCell>
                                              <TableCell>
                                                  {customer.name}
                                              </TableCell>
                                              <TableCell>
                                                  {customer.email}
                                              </TableCell>
                                              <TableCell>
                                                  {customer.mobile}
                                              </TableCell>
                                          </TableRow>
                                      );
                                  }) 
                              :"No data":"Fetching data"
                          }
                          </TableBody>
                      </Table>
                      {customers!==null?
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
