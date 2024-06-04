import LoginForm from './login-form';

const LoginPage = () => {
  return (
    <div>
      <h1 className='block text-center text-xl font-semibold mt-3'>Login</h1>
      <div className='flex justify-center items-center'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
