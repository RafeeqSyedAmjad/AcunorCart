import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); // Access the navigate function for redirection

    const handleSignUp = () => {
        // Redirect to Sign Up page when the "Sign Up" button is clicked
        navigate('/signup');
    };

    const handleLogIn = () => {
        // Redirect to Log In page when the "Log In" button is clicked
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Welcome to Your AcunorCart</h1>
            <div className="space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLogIn}
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default HomePage;
