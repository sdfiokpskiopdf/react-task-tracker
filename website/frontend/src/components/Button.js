import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button onClick={props.onClick} style={{ backgroundColor: props.color }} className='btn'>
            {props.text}
        </button>
    )
}

Button.defaultProps = {
    color: '#000',
    onClick: () => { console.log("Click") },
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default Button
