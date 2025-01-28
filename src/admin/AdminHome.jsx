import { Link } from "react-router-dom";
import AddRecipe from "../privateRoute/AddRecipe";

const AdminHome = ()=>{
    return(
        <div>
            <div>HEll0 admin</div>
                <div className="mx-10">
                <button className="btn btn-primary m-2" ><Link to='/admin/add'>Add recipe</Link></button>
                <button className="btn btn-primary m-2" ><Link to='/admin/update'>update recipe</Link></button>
                <button className="btn btn-primary m-2" ><Link to='/admin/delete'>Delete recipe</Link></button>
                </div>
            </div>
            
    )
}

export default AdminHome;