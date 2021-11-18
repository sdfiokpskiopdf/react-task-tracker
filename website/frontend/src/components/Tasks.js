import Task from './Task'
import PropTypes from 'prop-types';

const Tasks = (props) => {
    return (
        <>
            {props.tasks.map((task) => (<Task key={task.id} task={task} onDelete={props.onDelete} onToggle={props.onToggle} />))}
        </>
    )
}

Tasks.defaultProps = {
    onDelete: (id) => { console.log(id) },
    onToggle: (id) => { console.log(id) },
}

Tasks.propTypes = {
    tasks: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default Tasks
