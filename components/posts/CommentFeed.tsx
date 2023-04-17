import CommentItem from "./CommentItem";

interface CommentFeedProps{
    comments?: Record<string, any>[];

}

const CommentFeed:React.FC<CommentFeedProps> = ({comments=[]}) => {
    //console.log("THIS IS COMMENT", comments);

    return ( 
        <>
        {comments.map((comment: Record<string, any>)=>(
            <CommentItem
                key={comment.id}
                data={comment}/>
        ))}
        </>
     );
}
 
export default CommentFeed;