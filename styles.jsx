import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  heroSection: {
    /* Add your hero section styles here */
  },
  heroTitle: {
    /* Add your hero title styles here */
  },
  heroSubtitle: {
    /* Add your hero subtitle styles here */
  },
  aboutSection: {
    /* Add your about section styles here */
  },
  aboutTitle: {
    /* Add your about title styles here */
  },
  aboutDescription: {
    /* Add your about description styles here */
  },
}));

export default useStyles;
