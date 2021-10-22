import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css'

const initialState = {
    name: '',
    email: '',
    contact: ''
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { name, email, contact } = state;

    const { id } = useParams();

    const getSingleUser = async (id) => {
        const res = await axios.get(`https://user-management-system-mysql.herokuapp.com/user/${id}`);
        if (res.status === 200) {
            setState({ ...res.data[0] });
        }
    }

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id])

    const addUser = async (data) => {
        const res = await axios.post('https://user-management-system-mysql.herokuapp.com/user', data);
        if (res.status === 200) {
            alert(res.data)
        }
    }
    const updateUser = async (data, id) => {
        const res = await axios.put(`https://user-management-system-mysql.herokuapp.com/user/${id}`, data);
        if (res.status === 200) {
            alert('updated successfully')
        }
    }

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            alert('fill all fields!!!');
        } else {
            if (id) {
                updateUser(state, id);
                history.push('/');
            } else {
                addUser(state);
                history.push('/');
            }
        }
    }

    const inputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: '100px' }}>
            <form style={{
                margin: 'auto',
                padding: '15px',
                maxWidth: '400px',
                alignContent: 'center'
            }}
                onSubmit={handleSubmit}
            >
                <label>Name</label>
                <input
                    type="text"
                    name='name'
                    id='name'
                    placeholder='Enter Name....'
                    onChange={inputChange}
                    value={name}
                />
                <br />
                <br />
                <label>Email</label>
                <input
                    type="text"
                    name='email'
                    id='email'
                    placeholder='Enter email....'
                    onChange={inputChange}
                    value={email}
                />
                <br />
                <br />
                <label>Contact</label>
                <input
                    type="number"
                    name='contact'
                    id='contact'
                    placeholder='Enter contact....'
                    onChange={inputChange}
                    value={contact}
                />
                <input className='btn-submit' type="submit" value={id ? 'update' : "submit"} />
            </form>
        </div>
    )
}

export default AddEdit