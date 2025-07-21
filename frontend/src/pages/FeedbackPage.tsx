import { useParams } from "react-router-dom";

const FeedbackPage = () => {
    const params = useParams();
    return (
        <div>{params.id}</div>
    );
}

export default FeedbackPage