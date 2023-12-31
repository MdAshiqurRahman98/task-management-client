import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const getCurrentTimestamp = () => {
        const currentDate = new Date();
        return currentDate.toISOString();
    }

    const onSubmit = async (data) => {
        const newTask = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            status: 'to-do',
            email: user.email,
            timestamp: getCurrentTimestamp()
        };

        console.log(newTask);

        // Send data to the server
        axiosSecure.post(`/api/v1/add-task?email=${user?.email}`, newTask)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Task Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    reset();
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>Add Task | TaskFlow</title>
            </Helmet>
            <div className="bg-base-200 p-24 mt-12 mb-9">
                <h3 className="text-3xl font-bold mb-7">Add a Task</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* form title and description row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <label className="input-group">
                                <input type="text" {...register("title", { required: true })} placeholder="Enter task title" className="input input-bordered w-full" />
                                {errors.title && <span className="text-red-500 text-right">Title is required</span>}
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <label className="input-group">
                                <input type="text" {...register("description", { required: true })} placeholder="Enter task description" className="input input-bordered w-full" />
                                {errors.description && <span className="text-red-500 text-right">Description is required</span>}
                            </label>
                        </div>
                    </div>
                    {/* form deadline and priority row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Deadline</span>
                            </label>
                            <label className="input-group">
                                <input type="date" {...register("deadline", { required: true })} placeholder="Select deadline" className="input input-bordered w-full" />
                                {errors.deadline && <span className="text-red-500 text-right">Deadline is required</span>}
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text font-medium">Priority</span>
                            </label>
                            <select {...register("priority", { required: true })} className="select select-bordered">
                                <option disabled selected>Select priority level</option>
                                <option>Low</option>
                                <option>Moderate</option>
                                <option>High</option>
                            </select>
                            {errors.priority && <span className="text-red-500 text-right">Priority is required</span>}
                        </div>
                    </div>
                    <input type="submit" value="Add Task" className="btn btn-block text-white bg-teal-500 hover:bg-teal-500 normal-case" />
                </form>
            </div>
        </>
    );
};

export default AddTask;