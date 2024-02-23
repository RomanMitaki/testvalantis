import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <p className={classes.Footer__copyright}>© Roman Mitaki</p>
      <p className={classes.Footer__copyright}>Test</p>
    </footer>
  );
};

export default Footer;
