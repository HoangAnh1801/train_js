'use client'
import {useRouter, useSearchParams} from 'next/navigation'
import axios from "axios";
import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams  } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import {Button} from "@mui/material";
import Swal from 'sweetalert2'
import userService from "../services/userService";
import Search from '../components/search'

type User = {
    id: number;
    userName: string;
    fullName: string;
    phone: string;
    password ?: string
};



export default function ListUser({searchParams,}: Readonly<{ query?: string; page?: string; }>) {
    const router = useRouter();
    const search = useSearchParams();
    console.log('search', search.get('query'))
    // const query = searchParams?.query || '';
    // console.log('query', query)
    const [listUser, setListUser] = useState<User[]>([]);
    const rowsWithIndex = listUser.map((row, index) => ({
        ...row,
        index
    }));

    const columns: GridColDef[] = [
        {
            field: 'rowNumber',
            headerName: 'No.',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams<number>) => params.row.index + 1,
        },
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
            width: 500,
            editable: false,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            // type: 'number',
            width: 160,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            sortable: false,
            renderCell: (params: GridRenderCellParams <User>) => (
                <>
                    <CreateIcon
                        onClick={() => handleEdit(params.row.id)}
                        style={{ cursor: 'pointer' }}
                    />
                    <DeleteIcon
                        onClick={() => handleDelete(params.row.id)}
                        style={{ cursor: 'pointer' }}
                    />
                </>
            ),
        },
    ];

    const deleteUser = (id : number, setListUser: React.Dispatch<React.SetStateAction<User[]>>) => {
        console.log(`Deleting row with ID: ${id}`);
        Swal.fire({
            title: "Do you want to save the changes?",
            confirmButtonColor: "#b80d18",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                userService.deleteById(id).then(function (response: { data: any; } ) {
                    console.log('response', response.data);
                    Swal.fire("Deleted!", "", "success");
                    getListUser('');
                })
            }
        });
    };

    async function getListUser(query : any) {
        const response = await userService.getListUser(query);
        setListUser(response.data)
    }

    useEffect(() => {
        const query = search.get('query');
        console.log('query', query)
        getListUser(query);
    }, [search])

    const handleDelete = async (id: number) =>  {
        await deleteUser(id, setListUser);
    }
    const handleEdit = (id: number) =>  {
        router.push(`/user/${id}/edit`)
    }

    const redirectAdduser = () => {
        router.push('/user/adduser');
    }

    return (
        <div className={'container'}>
            <h3 className={'text-center'}>List user</h3>
            <div className={'row justify-content-end px-3 mb-1'}>
                <Search />
                <Button variant="contained" color="success" onClick={redirectAdduser}>Add user</Button>
            </div>
            <div className={'row'}>
                <div className={'col-12'}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rowsWithIndex}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            // checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}