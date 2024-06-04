import RegisterForm from "./register-form";

const RegisterPage = () => {
  return (
    <div>
      <h1 className="block text-center text-xl font-semibold mt-3">Register</h1>
      <div className="flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
