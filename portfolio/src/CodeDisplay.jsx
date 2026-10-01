import { useParams, Link } from "react-router-dom";

const fruits = [
  {
    id: 1,
    name: "Apple",
    category: "Fruit",
    price: 120,
    stock: 20,
    description: "Fresh and crunchy red apples.",
  },
  {
    id: 2,
    name: "Banana",
    category: "Fruit",
    price: 60,
    stock: 30,
    description: "Sweet and ripe bananas.",
  },
  {
    id: 3,
    name: "Carrot",
    category: "Vegetable",
    price: 80,
    stock: 15,
    description: "Fresh crunchy carrots.",
  },
];

function FruitDetails() {
  const { id } = useParams();

  const fruit = fruits.find(
    (fruit) => fruit.id === Number(id)
  );

  if (!fruit) {
    return <h1>Fruit not found</h1>;
  }

  return (
    <main>
      <Link to="/">← Back</Link>

      <h1>{fruit.name}</h1>

      <p>{fruit.description}</p>

      <p>Category: {fruit.category}</p>

      <p>Price: ₹{fruit.price}</p>

      <p>Stock: {fruit.stock}</p>

      <button>Add to Cart</button>
    </main>
  );
}

export default FruitDetails;