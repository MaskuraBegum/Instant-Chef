import { Link } from "react-router-dom";
import AddRecipe from "../privateRoute/AddRecipe";

const AdminHome = ()=>{
    return(
        <div>
            <div>HEllo admin</div>
                <button className="btn btn-primary" ><Link to='/admin/add'>Add recipe</Link></button>
            </div>
    )
}

export default AdminHome;