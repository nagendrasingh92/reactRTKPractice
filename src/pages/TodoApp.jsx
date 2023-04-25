import { useState } from "react";
import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import './todoApp.scss';

function TodoApp() {

    const data = useSelector((c) => {
        console.log('redux', c.show.value)
        return c.show.value;
    })
    const [userInput, setUserInput] = useState('');
    const [taskContainer, setTaskContainer] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const [taskSearchFilter, setTaskSearchFilter] = useState([]);
    const [taskStatus, setTaskStatus] = useState('all');

    const [isEdit, setIsEdit] = useState(false);
    const [checked, setChecked] = useState([0]);

    const handleToggle = (value, id) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (!currentIndex) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        let tempTaskList = [...taskContainer];
        let checkboxTemp = tempTaskList.map((item) => {
            if (item.id === id) {
                switch (item.status) {
                    case 'completed':
                        item.status = 'pending'
                        break;
                    default:
                        item.status = 'completed';
                        break;
                }
            }
            return item
        })
        setTaskContainer(checkboxTemp)
        setTaskSearchFilter(checkboxTemp)
    };
    const handleChange = (value) => {
        setUserInput(value)
        console.log('userInput', userInput)
    }

    const handleTask = () => {
        let similarTask = taskContainer.filter((item) => item.taskText.toLowerCase() === userInput.toLowerCase());
        if (userInput === '') {
            alert('please enter the task')
        } if (isEdit) {
            let tempTaskList = [...taskContainer];
            tempTaskList = tempTaskList.map((item) => {
                if (item.isEdit) {
                    item.taskText = userInput;
                    item.isEdit = false;
                }

                return item;
            })
            setIsEdit(false)
            setTaskContainer(tempTaskList)
            setTaskSearchFilter(tempTaskList)

        } else if (similarTask && !similarTask.length) {
            let Id = (new Date().getTime()).toString(36)
            let taskTemp = [...taskContainer, { id: Id, taskText: userInput, isEdit: false, editTask: userInput, status: 'pending' }];
            console.log('taskTemp', taskTemp);
            setTaskContainer(taskTemp)
            setTaskSearchFilter(taskTemp)
            taskTemp = '';
            console.log('similarTask', similarTask.length);
        } else {
            alert('Task Already exists.')
        }
        setUserInput('')
    }

    const handleEdit = (id) => {
        setIsEdit(true)
        let tempTaskList = [...taskContainer];
        console.log('value', id)
        let editTemp = tempTaskList.map((item) => {
            if (item.id === id) {
                item.isEdit = true;
                setUserInput(item.taskText)
            }
            return item
        })
        setTaskContainer(editTemp)
        setTaskSearchFilter(editTemp)
    }

    const handleDelete = (id) => {
        let deleteTemp = taskContainer.filter((item) => {
            return (
                item.id !== id
            )
        })
        setTaskContainer(deleteTemp)
        setTaskSearchFilter(deleteTemp)

    }

    const handleTaskCancel = () => {
        setIsEdit(false);
        setUserInput('')
    }

    const handleSearchValue = (event) => {
        setFilterVal(event.target.value)
        console.log('search', event.target.value)
    }

    const handleFilter = () => {
        if (filterVal === '') {
            setTaskSearchFilter(taskContainer)
        } else {
            const filterResult = taskContainer.filter(item => item.taskText.toLowerCase().includes(filterVal.toLowerCase()))
            setTaskSearchFilter(filterResult)
        }

    }

    const handleStatusFilter = (event) => {
        console.log(event.target.value)
        let filter = event.target.value;
        setTaskStatus(filter)
        taskContainer.filter((item) => (filter !== 'all' ? item.status === filter : true))

    }

    return (
        <div className="todoAppWrap">
            {data}
            <div className="todoTitle">
                <h2>Todo List App</h2>
            </div>
            <div className="taskInput">
                <input
                    value={userInput}
                    onChange={(event) => handleChange(event.target.value)}
                    type='text'
                    name='task'
                    placeholder="New Task"
                />
                <Stack spacing={2} direction="row">
                    <Button variant="contained" className="taskButton" onClick={() => handleTask()}>{isEdit ? 'Save' : 'Add'}</Button>
                    {isEdit ? (<Button variant="contained" className="taskButton" onClick={() => handleTaskCancel()}>{isEdit ? 'Cancle' : ''}</Button>) : ''}

                </Stack>
            </div>
            <div className="searchWrap">
                <div className="taskOperation">
                    <div className="searchBttn" onClick={() => handleFilter()}>
                        Search by task name
                    </div>
                    <input
                        placeholder="search"
                        className="searchBarInput"
                        type="text"
                        value={filterVal}
                        onChange={(event) => handleSearchValue(event)}
                    />

                </div>

            </div>
            <div className="taskOperation">
                <div>
                    Search by status
                </div>
                <select name="taskStatus" value={taskStatus} onChange={(event) => handleStatusFilter(event)}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {taskSearchFilter.filter((item) => (taskStatus !== 'all' ? item.status === taskStatus : true)).map((value, index) => {
                    const labelId = `checkbox-list-label-${value.index}`;
                    return (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                </IconButton>

                            }
                            className="taskList"
                            disablePadding

                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value, value.id)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.taskText} />
                            </ListItemButton>
                            <Button variant="contained" className="taskButton" onClick={() => handleEdit(value.id)}>Edit</Button>
                            <Button variant="contained" className="taskButton" onClick={() => handleDelete(value.id)}>Delete</Button>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    )

}
export default TodoApp;