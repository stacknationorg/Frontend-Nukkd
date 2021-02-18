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
import Modal from "../../Modal";

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


export default function Products() {
    const [products,setProducts] = React.useState("");
    const [modalProduct,setModalProduct] = React.useState("");
    const [total,setTotal] = React.useState(0);
    const [current_page,setCurrentPage] = React.useState(1);
    const fetchProducts = () => {
      axios.post(`${APILink}/admin/products`)
      .then(res => {
          if(res.data.products.length===0){
              setProducts(null);
          }
          else{
              const m = chunk(res.data.products,10);
              setTotal(res.data.products.length);
              setProducts(m);
          }
      });
    }
    React.useEffect(fetchProducts,[]);
  
    const classes = useStyles();
    return (
      <div>
          <Title title={`${Name} | Admin | Products`} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                      <h3 className={`${classes.cardTitle} text-light`}>
                          Products
                      </h3>
                      <p className={`${classes.cardProduct} text-light`}>All Products</p>
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
                                  <TableCell>
                                      Action
                                  </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {products!==""?(products!==null)?
                                  products[current_page-1].map((product,key) => {
                                      return(
                                          <TableRow key={key}>
                                              <TableCell>
                                                  {key+1}
                                              </TableCell>
                                              <TableCell>
                                                  {product.name}
                                              </TableCell>
                                              <TableCell>
                                                  <FetchOwner id={product.owner_id}/>
                                              </TableCell>
                                              <TableCell>
                                                  <button onClick={() => setModalProduct(product)} className="btn btn-success" data-toggle="modal" data-target="#productModal"><i className="fa fa-eye"></i></button>
                                              </TableCell>
                                          </TableRow>
                                      );
                                  }) 
                              :"No data":"Fetching data"
                          }
                          </TableBody>
                      </Table>
                      {products!==null?
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
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div className="modal-dialog mw-100 w-75 modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="productModalLabel">Information about the product</h5>
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
                                      Price
                                  </TableCell>
                                  <TableCell>
                                      Offer
                                  </TableCell>
                                  <TableCell>
                                      Description
                                  </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {modalProduct!==null?
                                <TableRow>
                                    <TableCell>
                                        {modalProduct.name}
                                    </TableCell>
                                    <TableCell>
                                        {modalProduct.price}
                                    </TableCell>
                                    <TableCell>
                                        {modalProduct.offer}
                                    </TableCell>
                                    <TableCell>
                                        {modalProduct.description}
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
