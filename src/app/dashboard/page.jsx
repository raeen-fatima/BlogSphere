import ExploreBtn from "../../components/ExploreBtn";
import YourBlog from "../../components/YourBlog";
import { Toaster } from "react-hot-toast";


function page() {
  return (
     <div className="max-w-5xl mx-auto mt-10 p-6">
      <Toaster position="top-right" />
      <ExploreBtn />
      <YourBlog />
      
    </div>
  )
}

export default page
