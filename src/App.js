import "./App.css";
import Input from "./components/input/Input";

function handleOnClick(elementId) {
	const inputIds = ['quotation-1', 'quotation-2', 'bet'];

	if (!inputIds.includes(elementId)) {
		const viewport = document.querySelector('meta[name=viewport]');
		viewport.content = 'width=device-width, initial-scale=1';
	}
}

function App() {
	return (
		<div className="App" onClick={(event) => handleOnClick(event.target.id)}>
			<Input />
		</div>
	);
}

export default App;
