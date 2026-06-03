import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { setUser, setLoading, signInWithEmailAndPass } =
    useContext(AuthContext);
    const navigate = useNavigate()

  // login handler function
  const handleSingUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValue = Object.fromEntries(formData.entries());
    console.log(formValue);

    signInWithEmailAndPass(formValue.email, formValue.password)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        Swal.fire({
          title: "welcome",
          icon: "success",
          text: "User Logged successfully!",
        });
        navigate('/dashboard')
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  };

  return (
    <div className="card bg-base-100 mt-15 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl text-center font-bold">Login</h2>
        <p className="text-center">
          Don't have any account?
          <NavLink to={"/dashboard/register"} className={"text-blue-600"}>
            {" "}
            Register
          </NavLink>
        </p>
        <form onSubmit={handleSingUser} className="fieldset">
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
        </form>
        <div className="divider">or</div>
        {/* Google */}
        <button
          //   onClick={handleSignInWithGoogle}
          className="btn rounded-xl bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
