import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "./TableData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Product: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);
  useEffect(() => {

    async function getData() {
      const response = await axios.get(`http://localhost:5057/api/v1/product/${id}`);
      setProduct(response.data);
    }
    getData();
  }, []);

  const cancelClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("Cancel clicked");
    navigate("/");
  }

  const saveProduct: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const product = {
      name: formdata.get("name") as string,
      category: formdata.get("category") as string,
      price: parseInt(formdata.get("price") as string),
      stock: parseInt(formdata.get("stock") as string),
    }
    console.log(product);
    const response = await axios.put(`http://localhost:5057/api/v1/product/${id}`, product);
    console.log(response.data);
    navigate("/");
  }

  return (
    <div className="m-4 p-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Product Details</h2>
        <Button variant={'link'} onClick={()=>{
            navigate('/')
        }}>Home</Button>
      </div>
      <div className="flex justify-center">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <div></div>
            <CardDescription>
              Edit and Save this Product in one click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveProduct}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name"  placeholder={product?.name} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category">
                        <SelectTrigger id="category">
                            <SelectValue placeholder={product?.category}  />
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
                  <Input id="price" name="price" type="number" placeholder={`${product?.price}`} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" name="stock" type="number" placeholder={`${product?.stock}`} />
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <Button variant="outline" onClick={cancelClicked}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>

          </CardContent>
          
        </Card>
      </div>
    </div>
  );
};

export default Product;
