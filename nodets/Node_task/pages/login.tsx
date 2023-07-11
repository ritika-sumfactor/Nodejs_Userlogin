import React, { useState, useEffect } from 'react';
import GetAllUser from '../components/getAlluser';
import { useRouter } from 'next/router';


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);

    const handleButtonClick = () => {
        setShowUserDetails(true);
    };

    useEffect(() => {
        let sessionTimeout: any;

        if (isLoggedIn) {
            sessionTimeout = setTimeout(() => {
                handleLogout();
            }, 5 * 60 * 1000);
        }

        return () => {
            clearTimeout(sessionTimeout);
        };
    }, [isLoggedIn]);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const userData = {

            email,
            password

        };
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            console.log({ response });
            if (response.ok) {
                setIsLoggedIn(true);
                console.log('successfully login');
            } else {
                alert("please register before login");
                router.push('/');
            }
        } catch (error) {
            console.error('error in login', error);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
    };
    const register = () => {
        router.push('/');
    }

    return (

        <div>
            {isLoggedIn ? (

                <div>
                    <h2>Logged In, {name}!</h2>
                    <GetAllUser />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <>
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <label>
                            Username:
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="submit">Login</button>

                    </form>
                </>

            )}
        </div>
    );
};

export default Login;
