'use client'
import axios from "axios";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material";
import { useRouter } from 'next/router'

type User = {
    id: number;
    userName: string;
    fullName: string;
    phone: string;
    password ?: string
};


const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Deleting row with ID: ${id}`);
    axios.delete('http://localhost:8686/api/user/id?id=' + id).then(function (response) {
        console.log('response', response.data)
    })
    // Example: You might want to update your state or make an API call to delete the row
};

const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
        editable: false,
    },
    {
        field: 'userName',
        headerName: 'First name',
        width: 150,
        editable: false,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 350,
        editable: false,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        // type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 120,
        sortable: false,
        renderCell: (params) => (
            <DeleteIcon
                onClick={() => handleDelete(params.row.id)}  // Adjust this to your delete logic
                style={{ cursor: 'pointer' }}
            />
        ),
    },
];


export default function ListUser() {
    const router = useRouter();
    const [listUser, setListUser] = useState<User[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8686/api/user').then(function (response) {
            setListUser(response.data)
        })
    }, [])

    console.log('listUser', listUser)
    const redirectAdduser = () => {
        router.push('/about')
    }


    return (
        <div className={'container'}>
            <h3 className={'text-center'}>List user</h3>
            <div className={'row justify-content-end px-3 mb-1'}>
                <Button variant="contained" onClick={redirectAdduser}>Add user</Button>
            </div>
            <div className={'row'}>
                <div className={'col-12'}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={listUser}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            // checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}