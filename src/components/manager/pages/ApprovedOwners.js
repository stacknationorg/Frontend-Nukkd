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
import Modal from "../../Modal.js";

const useStyles = makeStyles(styles);


export default function ApprovedOwners() {
    const [owners,setOwners] = React.useState("");
    const [modalOwner,setModalOwner] = React.useState(null);
    const [total,setTotal] = React.useState(0);
    const [current_page,setCurrentPage] = React.useState(1);
    const fetchOwners = () => {
      axios.post(`${APILink}/admin/owners/approved`)
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
                      <p className={`${classes.cardCategory} text-light`}>Approved Owners</p>
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
                                                  <button className="btn btn-success mr-2" onClick={()=>setModalOwner(owner)} data-toggle="modal" data-target="#ownerModal"><i className="fa fa-eye"></i></button>
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
        <Modal>
        <div className="modal fade" id="ownerModal" tabIndex="-1" aria-labelledby="ownerModalLabel" aria-hidden="true">
            <div className="modal-dialog mw-100 w-75 modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="ownerModalLabel">Information about the owner</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                      <Table>
                          <TableHead className="text-primary">
                              <TableRow>
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
                                      Aadhar
                                  </TableCell>
                                  <TableCell>
                                      Pan
                                  </TableCell>
                                  <TableCell>
                                      Plan
                                  </TableCell>
                                  <TableCell>
                                      Stores
                                  </TableCell>
                                  <TableCell>
                                      Organisation Name
                                  </TableCell>
                                  <TableCell>
                                      Location
                                  </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {modalOwner!==null?
                                <TableRow>
                                    <TableCell>
                                        {modalOwner.name}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.email}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.mobile}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.aadhar??"Not added yet"}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.pan??"Not added yet"}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.plan??"Not added yet"}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.stores??"Not added yet"}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.org_name??"Not added yet"}
                                    </TableCell>
                                    <TableCell>
                                        {modalOwner.location??"Not added yet"}
                                    </TableCell>
                                </TableRow>
                                :""
                              }
                          </TableBody>
                      </Table>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
        </Modal>
      </div>
    );
}
