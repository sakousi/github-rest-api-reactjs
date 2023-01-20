import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GithubContext } from "../githubContext";

export default function Repo() {
    const githubContext = useContext(GithubContext);
    let { user, repo } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        githubContext.getRepository(user, repo).then(data => setData(data));
    }, [user, repo, githubContext])

    return (
        <div>
            <h1>Repo name: {data.name}</h1>
        </div>
    )
}
