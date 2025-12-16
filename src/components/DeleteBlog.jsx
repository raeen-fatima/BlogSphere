<button
  onClick={async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const res = await fetch(`/api/blog/${post._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Blog deleted!");
      // Optional: refresh page or remove blog from state
      window.location.reload();
    } else {
      const data = await res.json();
      toast.error(data.error || "Delete failed");
    }
  }}
  className="text-red-600 hover:underline"
>
  Delete
</button>
