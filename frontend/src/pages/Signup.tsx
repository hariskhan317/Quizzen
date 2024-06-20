import { useState, useEffect } from 'react';
import Input from '../components/Input';
import { userSignup } from '../store/userSlice/asyncThunk';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>(''); 
    const dispatch = useAppDispatch();
    const { isLogin } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const data = { name, email, password }
        dispatch(userSignup(data));
    }

    useEffect(() => {
        if (isLogin) {
            return navigate('/');
        }
    }, [isLogin])

    return (
        <div className='mt-20 w-11/12 md:w-1/2 lg:w-5/12 bg-white rounded-md px-10 py-10 mx-auto'>           <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=800" alt="Your Company"></img>
            <h2 className="mt-6 text-center text-3xl font-semibold capitalize text-gray-900 pb-10">
                Sign up to your account
            </h2>
            <form onSubmit={handleSubmit} > 
                <Input
                    label="Name"
                    name="name"
                    type="name"
                    value={name}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    className="my-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                
                <button type='submit' className='mt-7 border-2 px-4 py-1.5 w-full rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900 transition-all delay-all ease-in-out'>Signup</button>
            </form>
        </div>
    )
}

export default Signup;
