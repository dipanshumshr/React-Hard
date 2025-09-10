type Comment = {
  id : number,
  text : string,
  author : string,
  replies : Comment[]
}

type ChildrenProp = {
    data : Comment
}

function Comment({data} : ChildrenProp) {
  return (
   <>
      <li>
        {data.text} <strong>{data.author}</strong>
        <ul> {data.replies.map(reply => <Comment key={reply.id} data={reply}/>)}</ul>
      </li>
   </>
  )
}

export default Comment