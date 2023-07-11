import React, { useEffect, useState } from 'react';
import styles from './getAlluser.module.css';
const GetAllUser = () => {
    // ====================================================
    const deleteUser = async (email) => {
        const userData = {
            email,

        };
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log('successfully removed');
                //as soon as i get response we filter the data based on user email
                setData((prevData) => prevData.filter((user) => user.email !== email));

            } else {
                console.log('error');
            }
        } catch (error) {
            console.error('error in removing user', error);
        }
    }
    // =============================================================================================

    const [data1, setData] = useState([]);
    useEffect(() => {
        async function getuserlist() {
            const response = await fetch('http://localhost:3000/api/getall', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            setData(data.resultset);
            console.log(data.resultset);

        }
        getuserlist();
    }, []);
    const handleRowClick = (email) => {
        deleteUser(email);
    };
    // ============================================================================================= 
    const [editMode, setEditMode] = useState(false);

    const updateUser = async (email, fname, lname) => {
        const userData = {
            email, fname, lname
        };
        try {
            const response = await fetch('/api/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log('user updated successfully');
                setData((prevData) =>
                    prevData.map((user) => {
                        if (user.email === email) {
                            return { ...user, fname, lname };
                        }
                        return user;
                    })
                );
            } else {
                console.log('error in updating');
            }
        } catch (error) {
            console.error('error in updating user', error);
        }
    }
    const [editUserData, seteditUserData] = useState({
        email: '',
        fname: '',
        lname: ''
    });
    const handleRowClickUpdate = (email, fname, lname) => {
        setEditMode(true);

        seteditUserData({
            email,
            fname,
            lname
        });
    };

    const handleEditInputChange = (e) => {
        seteditUserData({
            ...editUserData,
            [e.target.name]: e.target.value
        });
    };
    const handleUpdateClick = (email) => {
        const updatedFname = editUserData.fname;
        const updatedLname = editUserData.lname;

        if (updatedFname && updatedLname) {
            updateUser(email, updatedFname, updatedLname);
            setEditMode(false);

        }
    };


    return (
        <>
            <table className={styles.table_header}>
                <thead>
                    <tr className={styles.table_row1}>
                        <th className={styles.table_head}>fname</th>
                        <th className={styles.table_head}>lname</th>
                        <th className={styles.table_head}>email</th>
                        <th className={styles.table_head}>password</th>
                        <th className={styles.table_head}>Delete user</th>
                        <th className={styles.table_head}>Edit User</th>


                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className={styles.table_row}>
                            <td className={styles.table_data}>
                                {editMode && editUserData.email === user.email ? (
                                    <input
                                        type="text"
                                        name="fname"
                                        value={editUserData.fname}
                                        onChange={handleEditInputChange}
                                    />
                                ) : (
                                    user.fname
                                )}
                            </td>
                            <td className={styles.table_data}>
                                {editMode && editUserData.email === user.email ? (
                                    <input
                                        type="text"
                                        name="lname"
                                        value={editUserData.lname}
                                        onChange={handleEditInputChange}
                                    />
                                ) : (
                                    user.lname
                                )}
                            </td>
                            <td className={styles.table_data}>{user.email}</td>
                            <td className={styles.table_data}>{user.password}</td>
                            <td className={styles.table_data}>{user.first_name}</td>
                            <td className={styles.table_data}>{user.last_name}</td>
                            <td className={styles.table_data}><button onClick={() => handleRowClick(user.email)}>Delete</button></td>
                            <td className={styles.table_data}>
                                {editMode && editUserData.email === user.email ? (
                                    <button onClick={() => handleUpdateClick(user.email)}>
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleRowClickUpdate(user.email, user.fname, user.lname)
                                        }
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}
export default GetAllUser;