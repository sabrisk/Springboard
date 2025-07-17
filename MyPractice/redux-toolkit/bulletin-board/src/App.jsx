import "./App.css";
import PostsList from "./app/features/posts/PostsList";
import AddPostForm from "./app/features/posts/AddPostForm";

function App() {
	return (
		<main className="app">
			<AddPostForm />
			<PostsList />
		</main>
	);
}

export default App;
