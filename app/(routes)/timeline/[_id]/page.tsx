"use client"
import { useEffect } from "react"
import ReadEvents from "../components/readEvents";
import PostEvents from "../components/postEvents";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useReplies } from "@/hooks/useReplies";

export default function Page({ params }: { params: { _id: string } }) {
  let selector = useSelector((state: RootState) => state.toggle2.value)
  let { specficEventData, allReplyData, vis, fetchRepliesData } = useReplies(params)
  useEffect(() => {
    fetchRepliesData()
  }, [selector])
  return (
    <div className="mx-0 sm:mx-0 md:mx-28 lg:mx-48 xl:mx-72 2xl:mx-96">
      {vis ?
        <>
          <ReadEvents
            replies={specficEventData?.replies.length}
            upvoteIds={specficEventData?.upvoteIds}
            downvoteIds={specficEventData?.downvoteIds}
            username={specficEventData?.username}
            img={specficEventData?.img}
            post={specficEventData?.post}
            _id={specficEventData?._id}
            hier={false}
            isReply={false}
          />
          <PostEvents userId={specficEventData?.userID} postId={specficEventData?._id} reply={true} />
          {allReplyData?.map((e, n) => (
            <ReadEvents
              username={e.writterName}
              post={e.reply}
              replies={0}
              img={e.img}
              _id={e._id}
              hier={false}
              upvoteIds={e?.upvoteIds}
              downvoteIds={e?.downvoteIds}
              isReply={true}
              key={n}
            />
          ))}
        </> :
        <p>hemloo loading</p>}
    </div>
  );
}