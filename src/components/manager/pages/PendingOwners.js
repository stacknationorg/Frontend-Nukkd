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
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Pagination from "react-js-pagination";
import { chunk } from "../../../shared/SharedFunctions.js";

const useStyles = makeStyles(styles);


export default function PendingOwners() {
    const [owners,setOwners] = React.useState("");
    const [total,setTotal] = React.useState(0);
    const [current_page,setCurrentPage] = React.useState(1);
    const fetchOwners = () => {
      axios.post(`${APILink}/admin/owners/pending`)
      .then(res => {
          if(res.data.owners.length===0){
              setOwners(null);
          }
          else{
              const m = chunk(res.data.owners,10);
              setTotal(res.data.owners.length);
              setOwners(m);
          }
      });
    }
    React.useEffect(fetchOwners,[]);
  
    const deleteM = (id) => {
        axios.post(`${APILink}/admin/owners/delete`,{id:id})
        .then(res => {
            if(res.data.status==="SUCCESS"){
                toastr.success("Owner successfully deleted");
                setCurrentPage(1);
                fetchOwners()
            }
            else{
                setOwners(res.data.owners);
            }
        })
        .catch(err => toastr.error(err.toString()));
    }
  
    const approve = (id) => {
        axios.post(`${APILink}/admin/owners/approve`,{id:id})
        .then(res => {
            if(res.data.status==="SUCCESS"){
                toastr.success("Owner successfully approved");
                setCurrentPage(1);
                fetchOwners()
            }
            else{
                setOwners(res.data.owners);
            }
        })
        .catch(err => toastr.error(err.toString()));
    }
  
    const review = (id) => {
        const a = prompt("Please enter a review note")
        if(a){
            axios.post(`${APILink}/admin/owners/review`,{id:id,message:a})
            .then(res => {
                if(res.data.status==="SUCCESS"){
                    toastr.success("Owner successfully put on review");
                    setCurrentPage(1);
                    fetchOwners()
                }
                else{
                    setOwners(res.data.owners);
                }
            })
            .catch(err => toastr.error(err.toString()));
        }
    }
  
    const classes = useStyles();
    return (
      <div>
          <Title title={`${Name} | Admin | Owners`} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                      <h3 className={`${classes.cardTitle} text-light`}>
                          Owners
                      </h3>
                      <p className={`${classes.cardCategory} text-light`}>Pending Owners</p>
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
                                  <TableCell>
                                      Action
                                  </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {owners!==""?(owners!==null)?
                                  owners[current_page-1].map((owner,key) => {
                                      return(
                                          <TableRow key={key}>
                                              <TableCell>
                                                  {key+1}
                                              </TableCell>
                                              <TableCell>
                                                  {owner.name}
                                              </TableCell>
                                              <TableCell>
                                                  {owner.email}
                                              </TableCell>
                                              <TableCell>
                                                  {owner.mobile}
                                              </TableCell>
                                              <TableCell>
                                                  <button className="btn btn-success mr-2" onClick={() => approve(owner._id)}><i className="fa fa-check"></i></button>
                                                  <button className="btn btn-success mr-2" onClick={() => review(owner._id)}><i className="fa fa-eye"></i></button>
                                                  <button className="btn btn-danger" onClick={() => deleteM(owner._id)}><i className="fa fa-trash"></i></button>
                                              </TableCell>
                                          </TableRow>
                                      );
                                  }) 
                              :"No data":"Fetching data"
                          }
                          </TableBody>
                      </Table>
                      {owners!==null?
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
