import Dashboard from "./components/Dashboard";
import TableData from "./components/TableData";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Product from "./components/Product";
import { Button } from "./components/ui/button";
import AddProduct from "./components/AddProduct";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductType } from "./components/TableData";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();

  async function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const product = {
      name: formdata.get("name") as string,
      category: formdata.get("category") as string,
      price: parseInt(formdata.get("price") as string),
      stock: parseInt(formdata.get("stock") as string),
    }
    const response = await axios.post('http://localhost:5057/api/v1/product/', product);
    console.log(response.data);
    if (response.status === 201) {
      window.location.reload();      
    }
  }
  return (
    <div className="m-4 p-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Add products to your inventory here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={addProduct}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" name="name" placeholder="Name of your product" required/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                        <SelectTrigger id="category">
                            <SelectValue placeholder={"Category"}  />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Toys">Toys</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="decimal" name="price" placeholder="Price of your product" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" name="stock" placeholder="Stock of your product" required />
                </div>
              </div> 
              <div className="mt-2 pt-2"></div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Dashboard />
      <TableData />
    </div>
  );
}

export default App;
