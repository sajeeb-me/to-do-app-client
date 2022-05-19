import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const email = user?.email;
        fetch(`http://localhost:5000/task?email=${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setTasks(data);
            })
    }, [tasks, user?.email])

    const handleDelete = id => {
        fetch(`http://localhost:5000/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                const confirmation = window.confirm("Are you sure to delete this task?")
                if (confirmation) {
                    toast.info('Deleted task!')
                }
            })
    }

    return (
        <section className='bg-slate-100 p-4 lg:p-8 h-screen'>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, index) => <tr key={task._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td>{task.name}</td>
                                    <td>{task.date}</td>
                                    <td>{task.description}</td>
                                    <td className='flex justify-center gap-4'>
                                        <button className='btn btn-primary btn-outline'>Complete</button>
                                        <button onClick={() => handleDelete(task._id)} className='btn btn-error btn-outline'>Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    );
};

export default MyTasks;