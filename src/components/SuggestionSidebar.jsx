// components/SuggestionsSidebar.jsx
"use client";

export default function SuggestionsSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Trending Topics</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>#Technology</li>
          <li>#Life</li>
          <li>#Programming</li>
          <li>#Design</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Recommended Authors</h3>
        <ul className="space-y-2">
          <li className="text-gray-700">Jane Doe</li>
          <li className="text-gray-700">John Smith</li>
          <li className="text-gray-700">Alex Johnson</li>
        </ul>
      </div>
    </div>
  );
}
