import React from 'react'

type Repo = {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    owner: {
        avatar_url: string;
    };
};

type RepoProps = {
    repo: Repo,
    onAdd : (id : number) => void,
    onRemove : (id : number) => void
    bookMark : boolean
}

function RepoCard({ repo , onAdd , onRemove , bookMark }: RepoProps) {
    return (
        <>
           <li className="repo-card">
            <div className="card-header">
                <img src={repo.owner.avatar_url} alt={`${repo.full_name} avatar`} className="avatar" />
                <h3>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.full_name}
                    </a>
                </h3>
            </div>
            <p className="card-description">{repo.description}</p>
            <div className="card-footer">
                <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
                {repo.language && <span className="language-badge">{repo.language}</span>}
            </div>
            <div>
                <button className="bookmark-btn"
                onClick={bookMark ? () => onRemove(repo.id) : () => onAdd(repo.id)}>
                    {bookMark ? "Added ✅" : "Add to bookMark"}
                </button>
            </div>
        </li>
        </>
    )
}

export default React.memo(RepoCard);