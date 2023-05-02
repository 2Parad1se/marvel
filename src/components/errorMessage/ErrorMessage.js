import errorImg from './error.gif';
import './errorMessage.scss';

function ErrorMessage() {
    return (
        <div className='errorImg' >
            <img className='errorImg' alt='Error!' src={errorImg} />
        </div>
        
    )
}

export default ErrorMessage;