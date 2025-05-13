'use client';
import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setRecipes(data.results || []);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe Search</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Search for a recipe"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      <ul className="grid grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border p-4 rounded">
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
            <h2 className="mt-2 font-semibold">{recipe.title}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
