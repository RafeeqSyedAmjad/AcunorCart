import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const { email, password } = formData;
        const userData = JSON.parse(localStorage.getItem('user'));

        if (!userData || userData.email !== email) {
            // Show error if email not found in Local Storage
            alert('Email not found.');
        } else if (userData.password !== password) {
            // Show error if password does not match
            alert('Please enter correct password.');
        } else {
            // If email and password match, show success message and redirect to Dashboard
            alert('Login successful! Redirecting to Dashboard.');
            // Redirect logic here using navigate function or other routing methods
            navigate('/dashboard');

        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            <form onSubmit={handleLogin} className="w-80">
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
