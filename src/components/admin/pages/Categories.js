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


export default function Categorys() {
    const [categorys,setCategorys] = React.useState("");
    const [total,setTotal] = React.useState(0);
    const [current_page,setCurrentPage] = React.useState(1);
    const fetchCategorys = () => {
      axios.post(`${APILink}/admin/categories`)
      .then(res => {
          if(res.data.categories.length===0){
              setCategorys(null);
          }
          else{
              const m = chunk(res.data.categories,10);
              setTotal(res.data.categories.length);
              setCategorys(m);
          }
      });
    }
    React.useEffect(fetchCategorys,[]);
  
    const classes = useStyles();
    return (
      <div>
          <Title title={`${Name} | Admin | Categories`} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                      <h3 className={`${classes.cardTitle} text-light`}>
                          Categories
                      </h3>
                      <p className={`${classes.cardCategory} text-light`}>All Categories</p>
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
                              {categorys!==""?(categorys!==null)?
                                  categorys[current_page-1].map((category,key) => {
                                      return(
                                          <TableRow key={key}>
                                              <TableCell>
                                                  {key+1}
                                              </TableCell>
                                              <TableCell>
                                                  {category.name}
                                              </TableCell>
                                              <TableCell>
                                                  <FetchOwner id={category.owner_id}/>
                                              </TableCell>
                                          </TableRow>
                                      );
                                  }) 
                              :"No data":"Fetching data"
                          }
                          </TableBody>
                      </Table>
                      {categorys!==null?
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
