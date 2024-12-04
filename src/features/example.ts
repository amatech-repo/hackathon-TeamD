export async function exampleFeature() {
  const example = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const jsonData = await example.json();
  return jsonData;
}
