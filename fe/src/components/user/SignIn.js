import SignInData from "./SignInData";
import classes from "./LoginPage.module.css";

function SignIn() {
  return (
    <body className={classes.body}>
      <div className={classes.card_background}>
        <div className={classes.inner_card}>
          <a className={classes.main_banner} href="/">
            GREENGREEN
          </a>
        </div>
        <SignInData />
      </div>
    </body>
  );
}

export default SignIn;
