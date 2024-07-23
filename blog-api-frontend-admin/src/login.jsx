import "./login.css";


funtion Login() {
return (
  <>
    <h1>Please Sign In</h1>
    <from className="login-form">
      <input
        type="email"
        id="username"
        name="username"
        required
        placeholder="Email"
      />
      <input
        type="password"
        id="password"
        name="password"
        required
        placeholder="Password"
      />
    </from>
  </>
);
}

export default Login;
