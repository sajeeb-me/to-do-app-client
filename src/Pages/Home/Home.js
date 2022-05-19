import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const Home = () => {
    const [date, setDate] = useState(new Date())
    const taskDate = format(date, 'PP');
    const [user] = useAuthState(auth)

    const handleSubmit = e => {
        e.preventDefault();
        const date = e.target.date.value;
        const name = e.target.name.value;
        const description = e.target.description.value;
        const task = {
            date,
            name,
            description,
            email: user?.email
        }
        // console.log(task);
        fetch('https://shrouded-everglades-29679.herokuapp.com/task', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Task added successfully!')
                    e.target.reset();
                }
                else {
                    toast.error('Failed to add the Task!')
                }
            })
    }

    return (
        <section className='lg:px-20'>
            <div className={`hero lg:min-h-screen`}>
                <div className="hero-content flex-col lg:flex-row gap-10 py-5">
                    <div className='flex-1 flex justify-center'>
                        <DayPicker
                            className='rounded-lg shadow-lg p-2'
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    </div>
                    <div className='flex-1 card shadow-lg'>
                        <div className='card-body'>
                            <h1 className='text-xl font-semibold text-primary'>Add to My Task</h1>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name='date' value={taskDate} className="input input-bordered w-full mb-3" disabled />
                                <input type="text" name='name' placeholder="Task name" className="input input-bordered w-full mb-3" required />
                                <input type="text" name='description' placeholder="Description" className="input input-bordered w-full mb-3" required />
                                <input type="submit" value="Add Task" className="btn btn-primary w-full mb-3" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;