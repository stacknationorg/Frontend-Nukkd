import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import People from "@material-ui/icons/People";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import Contacts from "@material-ui/icons/Contacts";
// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Danger from "../components/Typography/Danger.js";
import Success from "../components/Typography/Success.js";
import Warning from "../components/Typography/Warning.js";
import Info from "../components/Typography/Info.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardFooter from "../components/Card/CardFooter.js";
import Title from "../../../shared/Title"
import {APILink, Name} from "../../../shared/config"

import styles from "../../../assets/admin/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes } from "../../../shared/Routes.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [users,setUsers] = React.useState(0);
  const [products,setProducts] = React.useState(0);
  const [pendingProducts,setPendingProducts] = React.useState(0);
  const [withdrawals,setWithdrawals] = React.useState(0);
  React.useEffect(() => {
    axios.post(`${APILink}/admin/dashboard`)
      .then(res => {
        const data = res.data.response;
        setUsers(data.users);
        setProducts(data.products);
        setPendingProducts(data.pendingProducts);
        setWithdrawals(data.withdrawals);
      });
  },[])
  const classes = useStyles();
  return (
    <div>
        <Title title={`${Name} | ${Routes.adminDashboard.name}`} />
      {/* <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <People/>
              </CardIcon>
              <p className={classes.cardCategory}>Total Users</p>
              <h3 className={classes.cardTitle}>
                {users}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Warning>
                  <People/>
                </Warning>
                <Link to={Routes.adminUsers.path}>
                  View all users
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Products</p>
              <h3 className={classes.cardTitle}>{products}</h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Success>
                        <Store/>
                    </Success>
                    <Link to={Routes.adminProducts.path}>
                        View all products
                    </Link>
                </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Products</p>
              <h3 className={classes.cardTitle}>{pendingProducts}</h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Success>
                        <Store/>
                    </Success>
                    <Link to={Routes.adminPendingProducts.path}>
                        View all pending products
                    </Link>
                </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AccountBalanceWallet/>
              </CardIcon>
              <p className={classes.cardCategory}>Pending Withdrawals</p>
              <h3 className={classes.cardTitle}>{withdrawals}</h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Danger>
                        <AccountBalanceWallet/>
                    </Danger>
                    <Link to={Routes.adminWithdrawals.path}>
                        View all withdrawal requests
                    </Link>
                </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Contacts />
              </CardIcon>
              <p className={classes.cardCategory}>Messages</p>
              <h3 className={classes.cardTitle}>Count</h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Info>
                        <Contacts/>
                    </Info>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        View all messages
                    </a>
                </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      </GridContainer> */}
    </div>
  );
}
