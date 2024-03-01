import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "./ui/input"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export type ProductType = {
    id: number
    name: string
    category: string
    price: number
    stock: number
}

const TableData: React.FC = () => {
    const [data, setData] = useState<ProductType[]>([])
    const [filteredData, setFilteredData] = useState<ProductType[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        // read json data in public folder
        // fetch('/data.json')
        // .then(response => response.json())
        // .then(data => {
        //     setData(data)
        //     setFilteredData(data)
        // })
        async function getData(){
            const response = await axios.get('http://localhost:5057/api/v1/product/')
            setData(response.data)
            setFilteredData(response.data)
        }
        getData();
    }, [])

    function setInput(e: React.ChangeEvent<HTMLInputElement>){
        const search = e.target.value
        const filtered = data.filter( item => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredData(filtered)
    }

    return (
        <div className="mt-6">
            <div className="flex justify-end mb-2"> 
                <Input type="text" placeholder='Search' className="w-1/4" onChange={setInput}/>
            </div>
            
            <Table>
            <TableCaption>Products Table</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                </TableRow>
            </TableHeader>
            
            <TableBody>
            {filteredData.map( item => {
                return (
                        <TableRow key={item.id} className="hover:cursor-pointer" onClick={()=>{
                            navigate(`/product/${item.id}`)
                        }}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                        </TableRow>
                    
                )
            })}
            </TableBody>
            </Table>
        </div>
    )
}


export default TableData;