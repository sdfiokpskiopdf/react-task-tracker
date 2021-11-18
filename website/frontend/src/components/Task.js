import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Task = (props) => {
    return (
        <div className={`task ${props.task.reminder ? 'reminder' : ''}`} onDoubleClick={() => props.onToggle(props.task.id)}>
            <h3>{props.task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => props.onDelete(props.task.id)} /></h3>
            <p>{props.task.day}</p>
        </div>
    )
}

Task.defaultProps = {
    task: {
        id: 0,
        text: 'Example task',
        day: 'Example day',
        reminder: true
    },
    onDelete: (id) => { console.log(id) },
    onToggle: (id) => { console.log(id) },
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default Task
