import { useState } from 'react'


const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    
    const addTask = (e) => {
        e.preventDefault()

        if(text === '') {
            alert('Input some text')
            return
        }

        onAdd({text, day, reminder})

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className="add-form" onSubmit={ addTask }>
            <div className="form-control">
                <label>Task</label>
                <input 
                    type='text' 
                    placeholder="Add Task" 
                    checked={reminder}
                    value={text}
                    onChange={(e) => setText(e.target.value)}    
                />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type='text' placeholder="Add Day & Time" value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input type='checkbox' placeholder="Save Task" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type="submit" value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask