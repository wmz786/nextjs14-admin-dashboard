import styles from "@/app/ui/login/login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <h1>Login</h1>
        <input type="text" name="" placeholder="username" />
        <input type="password" name="" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
