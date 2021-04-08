import "./Side.css";

function Side(): JSX.Element {
    return (
        <div className="Side">
		<p>	{new Date(Date.now()).toDateString()} </p>
        </div>
    );
}

export default Side;
