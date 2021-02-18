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
import Modal from "../../Modal";
import {chunk} from "../../../shared/SharedFunctions";

const useStyles = makeStyles(styles);


export default function Managers() {
  const [managers,setManagers] = React.useState("");
  const [total,setTotal] = React.useState(0);
  const [current_page,setCurrentPage] = React.useState(1);
  const fetchManagers = () => {
    axios.post(`${APILink}/admin/managers`)
    .then(res => {
        if(res.data.managers.length===0){
            setManagers(null);
        }
        else{
            const m = chunk(res.data.managers,10);
            setTotal(res.data.managers.length);
            setManagers(m);
        }
    });
  }
  React.useEffect(fetchManagers,[]);

  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');

  const addManager = (e) => {
      e.preventDefault();
      axios.post(`${APILink}/admin/manager/register`,{username:username,password:password,email:email})
      .then(res => {
          if(res.data.status==="SUCCESS"){
              toastr.success("Manager successfully added");
              fetchManagers()
          }
          else{
              toastr.error(res.data.message);
          }
      })
      .catch(err => toastr.error(err.toString()));
  }

  const deleteM = (id) => {
      axios.post(`${APILink}/admin/manager/delete`,{id:id})
      .then(res => {
          if(res.data.status==="SUCCESS"){
              toastr.success("Manager successfully deleted");
              setCurrentPage(1);
              fetchManagers()
          }
          else{
              setManagers(res.data.managers);
          }
      })
      .catch(err => toastr.error(err.toString()));
  }

  const classes = useStyles();
  return (
    <div>
        <Title title={`${Name} | Admin | Managers`} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <div className="float-left">
                    <h3 className={`${classes.cardTitle} text-light`}>
                        Managers
                    </h3>
                    <p className={`${classes.cardCategory} text-light`}>Registered Managers</p>
                    </div>
                    <button className="float-right btn btn-primary" data-toggle="modal" data-target="#managerModal">Create new team manager</button>
                </CardHeader>
                <CardBody>
                    <Table>
                        <TableHead className="text-primary">
                            <TableRow>
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managers!==""?(managers!==null)?
                                managers[current_page-1].map((manager,key) => {
                                    return(
                                        <TableRow key={key}>
                                            <TableCell>
                                                {key+1}
                                            </TableCell>
                                            <TableCell>
                                                {manager.username}
                                            </TableCell>
                                            <TableCell>
                                                {manager.email}
                                            </TableCell>
                                            <TableCell>
                                                <button className="btn btn-danger" onClick={() => deleteM(manager._id)}><i className="fa fa-trash"></i></button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) 
                            :"No data":"Fetching data"
                        }
                        </TableBody>
                    </Table>
                    {managers!==null?
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
        <div className="modal fade" id="managerModal" tabIndex="-1" aria-labelledby="managerModalLabel" aria-hidden="true">
            <div className="modal-dialog mw-100 w-75 modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="managerModalLabel">Add a new team manager</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={e => addManager(e)}>
                        <div className="input-group mb-3 row">
                            <label htmlFor="username" className="col-md-2">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control col-md-10" placeholder="Username" name="username"/>
                        </div>
                        <div className="input-group mb-3 row">
                            <label htmlFor="email" className="col-md-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control col-md-10" placeholder="Email" name="email"/>
                        </div>
                        <div className="input-group mb-3 row">
                            <label htmlFor="password" className="col-md-2">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control col-md-10" placeholder="Password" name="password"/>
                        </div>
                        <button className="btn btn-success" type="submit">Add</button>
                    </form>
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