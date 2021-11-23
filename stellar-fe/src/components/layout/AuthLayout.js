// import React from 'react'
// import MainNav from './MainNav'
// import {
//   Grid,
//   Paper,
//   makeStyles,
//   Container,
//   Typography,
// } from '@material-ui/core'
// import ForeAuthImg from '../../img/onboard1.svg'
// import { Link } from 'react-router-dom'

// const useStyles = makeStyles((theme) => ({
//   main: {
//     // minHeight: '100vh',
//     // marginTop: theme.spacing(4)
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   paperRoot: {
//     padding: theme.spacing(3),
//   },
//   title: {
//     paddingBottom: theme.spacing(2),
//   },
//   routeLink: {
//     display: 'flex',
//     justifyContent: 'center',
//     paddingTop: theme.spacing(2),
//     padding: 'inherit',
//   },
//   Links: {
//     padding: theme.spacing(1)
//   }
// }));

// export default function AuthLayout(props) {
//   const classes = useStyles();
//   const { authComponent, authHeader, routeName, text, routeName2, text2 } = props;

//   return (
//     <>
//       <MainNav />

//       <Container maxWidth="md">
//         <Grid
//           direction="row"
//           alignItems="center"
//           justify="center"
//           style={{ minHeight: '100vh' }}
//           container
//           spacing={5}
//         >
//           <Grid item sm={6} xs={0}>
//             <Typography
//               variant="h5"
//               alignItems="center"
//               className={classes.title}
//             >
//               Welcome to your seamless experience
//             </Typography>
//             <div className={classes.foreImg}>
//               <img src={ForeAuthImg} class="img-fluid" />
//             </div>
//           </Grid>
//           <Grid item sm={6} xs={12}>
//             <Paper className={classes.paperRoot}>
//               <div className={classes.header}>
//                 <h5>{authHeader}</h5>
//               </div>
//               {authComponent}

//               <div className={classes.routeLink}>
//                 <Link to={`/${routeName}`} className={classes.Links}>{text}</Link>
//                 <Link to={`/${routeName2}`} className={classes.Links}>{text2}</Link>
//               </div>
            
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }
