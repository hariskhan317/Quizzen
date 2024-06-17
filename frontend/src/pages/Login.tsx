import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { userLogin } from '../store/userSlice/asyncThunk';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const { isLogin } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const data = { email, password }
        dispatch(userLogin(data));
    }

    useEffect(() => {
        if (isLogin) {
           return navigate('/');
        }
    }, [isLogin])

    return (
        <form onSubmit={handleSubmit} className='w-11/12 md:w-1/2 lg:w-1/4 bg-white rounded px-8 py-5 mx-auto space-y-6'> 
            <Input
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            
            <button type='submit' className='border-2 px-4 py-1.5 w-full rounded-lg'>Login</button>
        </form>
    )
}

export default Login;
