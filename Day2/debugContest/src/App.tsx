type UserProps = {
	name: string;
	age: number;
};

function UserCard({ name, age }: UserProps) {
	return (
		<div>
			<h4>{name}</h4>
			<p>{age} years old</p>
		</div>
	);
}

export default function App() {
	return (
		<div>
			<UserCard name="Dipanshu" age={25} />
		</div>
	);
}