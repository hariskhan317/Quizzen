import { useState } from 'react'
import Input from '../components/Input' 
import { userSignup } from '../store/userSlice/asyncThunk' 
import { useAppDispatch } from '../store/userSlice/hooks'

const Signup: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>(''); 
    const dispatch = useAppDispatch()
    
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, password);
        const data = { name, email, password }
        dispatch(userSignup(data));
    }

    return (
        <form onSubmit={handleSubmit} className='w-11/12 md:w-1/2 lg:w-1/4 bg-white rounded px-8 py-5 mx-auto space-y-6'> 
            <Input
                label="Name"
                name="name"
                type="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
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
            
            <button type='submit' className='border-2 px-4 py-1.5 w-full rounded-lg'>Signup</button>
        </form>
    )
}

export default Signup;
