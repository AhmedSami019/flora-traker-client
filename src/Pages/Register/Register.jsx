import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { signUpWithEmailAndPass, setUser, setLoading } =
    useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  // handler function
  const handleCreateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValue = Object.fromEntries(formData.entries());

    if (formValue.password !== formValue.confirmPassword) {
      toast.warn("match both password!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    signUpWithEmailAndPass(formValue.email, formValue.password)
      .then((result) => {
        const user = result.user;
        return updateProfile(user, {
          displayName: formValue.userName,
          photoURL: formValue.photo,
        }).then(() => {
          setUser({
            ...user,
            displayName: formValue.userName,
            photoURL: formValue.photo,
          });
          console.log(user);
          setLoading(false);

          Swal.fire({
            title: "Successful",
            icon: "success",
            text: "User signed up successfully!",
          });

          navigate("/dashboard");
        });
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
    <div className="card bg-base-100 mt-10 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl text-center font-bold">Register</h2>
        <p className="text-center">
          Already have an account?{" "}
          <NavLink to={"/login"} className={"text-blue-600"}>
            Login
          </NavLink>
        </p>
        <form onSubmit={handleCreateUser} className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            className="input w-full"
            name="userName"
            placeholder="Your name"
          />
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            name="email"
            placeholder="Email"
          />
          <label className="label">Photo url</label>
          <input
            type="url"
            className="input w-full"
            name="photo"
            placeholder="Photo url"
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            name="password"
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[!@#$%^&*]).{8,}"
          />
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input w-full"
            name="confirmPassword"
            placeholder="Confirm Password"
            pattern="(?=.*\d)(?=.*[!@#$%^&*]).{8,}"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4">Register</button>
        </form>
        {/* divider */}
        <div className="divider">OR</div>

        {/* Google */}
        <button className="btn rounded-xl bg-white text-black border-[#e5e5e5]">
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

export default Register;
