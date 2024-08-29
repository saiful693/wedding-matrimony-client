import { Link } from 'react-router-dom';
import errImg from '../../assets/images/error.webp'
const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center">
            <div>
                <img src={errImg} alt="" />
                <p className="text-2xl font-semibold flex justify-center">Go back to <Link to="/" className="text-blue-400 ml-2">Home</Link> </p>
            </div>
        </div>
    );
};

export default ErrorPage;