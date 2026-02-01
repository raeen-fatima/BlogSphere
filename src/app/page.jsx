// import BlogCard from "@/components/BlogCard";
import BlogList from "@/components/BlogList";
import ExploreBtn from "@/components/ExploreBtn"; 
export default async function BlogPage() {
 
  return (
    <>

    <main className="max-w-4xl  mx-auto px-4 py-10">
      <ExploreBtn />

      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">Your Daily Source of Truth</h1>
        <p className="text-gray-600 mt-2">
          Read inspiring stories, explore ideas, and publish your thoughts.
        </p>
      </section>
      <BlogList />

      
    </main>
    </>

  );
}

