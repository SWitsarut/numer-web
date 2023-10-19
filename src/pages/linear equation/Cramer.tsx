import axios from "axios";
import { useEffect, useState } from "react";

function Cramer() {
	useEffect(() => {
		document.title = "Secant";
	}, []);
	const [A, setA] = useState<number[][]>([[]]);
	const [B, setB] = useState<number[]>([]);
	const fetchAnswer = async () => {
		await axios.post("http://localhost:8080/secant", {}).then((e) => {
			e.status;
		});
	};
	return <div>Cramer</div>;
}

export default Cramer;
